var express = require('express');
var router = express.Router();
var dns = require('dns')
var ping = require('ping');

/* GET users listing. */

router.get('/', async function (req, res, next) {

  var obj = {}, dst = null;

  obj.dns_servers = dns.promises.getServers()
  console.log(obj.dns_servers)
  console.log(req.query.dst)

  req.query.dst ? dst = req.query.dst : null;

  var host = req.query.dst ? req.query.dst : process.env.PING_IP

  ping.promise.probe(host)
    .then(function (response) {

      if (response.alive) {
        obj.ping_result = response.host + " is reachable"
        console.log(response.host + " is reachable")

        return res.json(obj).end()
      }
      else {
        obj.ping_result = "unable to reach host " + response.host
        console.log(response.host + " is not reachable")

        return res.json(obj).end()
      }
    })
    .catch(function (err) {
      console.log(err)

      obj.ping_result = "error pinging host " + host

      return res.json(obj).end()
    })
});

module.exports = router;
