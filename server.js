const { createServer } = require('http');
const {parse} = require("url");
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const hostname = "localhost";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {     
    const parseUrl =  parse(req.url,true);
    return handle(req, res,parseUrl);
  }).listen(port, (err) => 
    {
    if (err) throw err;
    console.log(`Server running on http://${hostname}:${port}`);
  });
});