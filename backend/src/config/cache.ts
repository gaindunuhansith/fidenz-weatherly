import NodeCache from 'node-cache';

const weatherCache = new NodeCache({ stdTTL: 300 });

export default weatherCache;