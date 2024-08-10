const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "fs": false, // Désactiver fs car il ne fonctionne pas dans le navigateur
            "path": require.resolve("path-browserify"),
        }
    },
};