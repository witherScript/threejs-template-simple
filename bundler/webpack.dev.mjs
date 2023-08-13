import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.common.js';
import portFinderSync from 'portfinder-sync';
import {internalIpV4} from 'internal-ip';
const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

export default merge(commonConfiguration, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: portFinderSync.getPort(8080),
    static: {
      directory: './dist',
    },
    watchFiles: './dist',
    open: true,
    https: false,
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    allowedHosts: 'all',
    onListening: async function (server) {
      const port = server.server.address().port;
      const https = server.options.https ? 's' : '';
      const localIp = await internalIpV4() || 'localhost';
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;
  
      console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`);
    },
  },
});
