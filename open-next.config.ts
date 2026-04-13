// @ts-check
const { buildOptions } = require("@opennextjs/cloudflare");

/** @type {import("@opennextjs/cloudflare").OpenNextConfig} */
const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      // Use the Cloudflare-compatible incremental cache
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },

  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

module.exports = config;
