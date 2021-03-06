# Sample NodeJS API (Container option available)

## Instructions
* Create an optional `.env` file in the main directory with the following environment variables:
    * `INSTR_KEY=<your azure app insights intrumentation key.>` <- optional
    * `PORT=<port you'd like to run the app on>` <- optional
    * `PING_IP=8.8.8.8` <- valid IP address that the app will try to ping
    * `TRACEROUTE_IP=8.8.8.8` <- (coming soon: traceroute IP address)
* Install dependencies `npm install`
* Build the container `docker build --rm -f "Dockerfile" -t <image_name>:<version> "."` 
* Run the container `docker run --rm -d  -p 80:80/tcp <image_name>:<version>`
* If you navigate to `<url>/path`, you should be able to see your current DNS servers and ping results
* You should be able to navigate to the container URL and see something like this:
```{
"method": "GET",
"path": "/",
"hostname": "localhost",
"orig_url": "/",
"qs": {}, <-- any existing query strings?
"user_ip": {
"ip": "::ffff:172.17.0.1", <-- your source IP address
"fwd": "none" <-- if there's any proxy/load balancer
},
"cookies": {},
"header": {
  "host": "localhost",
  "connection": "keep-alive",
  "upgrade-insecure-requests": "1",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like   Gecko) Chrome/81.0.4044.113 Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;  q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "none",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-US,en;q=0.9"
  }
}
```




