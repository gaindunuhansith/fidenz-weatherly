import NodeCache from 'node-cache';

const weatherCache = new NodeCache({ stdTTL: 3000 });

export default weatherCache;