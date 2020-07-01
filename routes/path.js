var express = require('express');
var router = express.Router();
var dns = require('dns')
var traceroute = require('traceroute');
var ping = require('ping');

/* GET users listing. */

router.get('/', function (req, res, next) {

  var obj = {}

  obj.dns_servers = dns.promises.getServers()  

  var host = process.env.PING_IP

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
