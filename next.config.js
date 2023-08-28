const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.resolve.alias['@src'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
