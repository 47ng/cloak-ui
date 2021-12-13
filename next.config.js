const withPlugins = require('next-compose-plugins')
const withTranspilation = require('next-transpile-modules')([
  '@47ng/chakra-next'
])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {}

module.exports = withPlugins(
  [withBundleAnalyzer, withTranspilation],
  nextConfig
)
