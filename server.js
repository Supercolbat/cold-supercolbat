const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression')

const app = express();
console.log('Enabling gzip'); app.use(compression());

app.get('/', function (req, res) {
  res.send(fs.readFileSync('build/index.html', 'utf-8'));
});

app.get('/blog', function (req, res) {
  if (req.path) {
    let file = path.join(__dirname, req.url);
    res.send(fs.readFileSync(file));
  }
});

app.get('/b', function (req, res) {
  if (req.path) {
    let file = path.join(__dirname, req.url);
    res.send(fs.readFileSync(file));
  }
});

app.get('*', function (req, res) {
  if (req.url.match(/\/assets\/fonts\/\w+\.(ttf|woff2?)/g)) {
    let file = path.join(__dirname, req.url);
    res.send(fs.readFileSync(file));
  }
});

console.log('Starting web server on port 8080');
app.listen(8080);