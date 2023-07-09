"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkX3D7QDSFcjs = require('./chunk-X3D7QDSF.cjs');
require('./chunk-HXH54CTS.cjs');

// src/astro.ts
function astro_default(options) {
  return {
    name: "unplugin-auto-import",
    hooks: {
      "astro:config:setup": async (astro) => {
        var _a;
        (_a = astro.config.vite).plugins || (_a.plugins = []);
        astro.config.vite.plugins.push(_chunkX3D7QDSFcjs.unplugin_default.vite(options));
      }
    }
  };
}


module.exports = astro_default;
exports.default = module.exports;