// @ts-nocheck
const redis = require('redis');

const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(redisPort);

// cacheHandler middleware
const cacheHandler = (req, res, next) => {
  const { username } = req.body;
  redisClient.get(username, (err, data) => {
    if (err) throw err;

    // nil in redis CLI
    if (data !== null) {
      console.log(data);
      res.send(username, data);
    } else {
      next();
    }
  });
};

module.exports = cacheHandler;
