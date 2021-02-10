const withPlugins = require('next-compose-plugins')
const withTranspilation = require('next-transpile-modules')([
  '@47ng/chakra-next'
])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {}

module.exports = withPlugins(
  [
    withBundleAnalyzer,
    // [withSourceMaps, {}, [PHASE_PRODUCTION_BUILD]],
    withTranspilation
    // [
    //   withMDX,
    //   {
    //     pageExtensions: ['tsx', 'mdx']
    //   },
    //   // Remove to enable MDX rendering to production
    //   [PHASE_DEVELOPMENT_SERVER]
    // ]
  ],
  nextConfig
)
