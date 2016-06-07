const express = require('express');
const path = require('path');


//if not using proxy through webpack config
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const app = express();

const isInProduction = process.env.NODE_ENV === 'production';
const port = isInProduction ? process.env.PORT : 3000;

if (!isInProduction) {
  const bundle = require('./bundle');
  bundle();
  
  app.all('/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}
// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
// proxy.on('error', function(event) {
//   console.log('Could not connect to proxy, please try again...');
// });


app.use(express.static('./'));



app.listen(port, function () {
  console.log('Listening on port ' + port + '..');
})