const config = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: 'cloudflare-kv',
    },
  },
};

export default config;
