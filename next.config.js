require('dotenv').config()
const {
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER
} = require('next/constants')
const webpack = require('webpack')
const withPlugins = require('next-compose-plugins')
const withTranspilation = require('next-transpile-modules')([
  '@47ng/chakra-next'
])
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const loadFromEnv = names => {
  const out = {}
  for (const name of names) {
    out[name] = process.env[name]
  }
  return out
}

const nextConfig = {
  // Will be available both in the client and server
  env: loadFromEnv(['SENTRY_DSN']),

  webpack: (config, { buildId }) => {
    // Fixes npm packages that depend on `fs` module
    // config.node = {
    //   fs: 'empty'
    // }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
      })
    )
    return config
  },
  ...(process.env.NODE_ENV === 'production'
    ? {}
    : {
        experimental: {
          reactRefresh: true
        }
      })
}

module.exports = withPlugins(
  [
    withBundleAnalyzer,
    [withSourceMaps, {}, [PHASE_PRODUCTION_BUILD]],
    withTranspilation,
    [
      withMDX,
      {
        pageExtensions: ['tsx', 'mdx']
      },
      // Remove to enable MDX rendering to production
      [PHASE_DEVELOPMENT_SERVER]
    ]
  ],
  nextConfig
)
