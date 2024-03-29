// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'},
  watcher: {
    awaitWriteFinish: true,
    usePolling: true
  }
};

exports.plugins = {
  babel: {presets: ['latest', 'react'], pattern: /.(js|jsx)$/}
};
