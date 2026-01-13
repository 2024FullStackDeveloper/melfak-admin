// server.js
const express = require('express');
const next = require('next');

const dev = false; // production
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  server.all('*', (req, res) => handle(req, res));
  server.listen(port, () => console.log(`Ready on ${port}`));
});
