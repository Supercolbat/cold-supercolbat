const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();

console.log('Enabling gzip');
app.use(compression());

app.get('/', function (req, res) {
  res.send(fs.readFileSync('build/index.min.html', 'utf-8'));
});

app.get('*', function (req, res) {
  // Limits access but still probably a security risk lol
  if (req.url.match(/\/assets\/fonts\/\w+\.(ttf|woff2?)/g)) {
    let file = path.join(__dirname, req.url);
    res.send(fs.readFileSync(file));
  } else {
    res.status(404).send(`<pre>\
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 4
Vary: Accept-Encoding
Date: Mon, 1 Apr 2020 04:20:00 UTC
Connection: keep-alive
Keep-Alive: timeout=5

nope</pre>`);
  }
});

console.log('Starting web server on port 8080');
app.listen(8080);