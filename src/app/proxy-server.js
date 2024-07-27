const express = require('express');
const request = require('request');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/rates', (req, res) => {
  const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  request(apiUrl, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(response.statusCode).json(JSON.parse(body));
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});