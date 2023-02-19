const get = (req, res, client) => {
  client.channels.cache.get("1046112475273232425").send("Hello here!");
  res.send("Hello Worldx!");
};

module.exports = { get };
