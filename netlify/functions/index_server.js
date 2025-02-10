import express from 'express';
import fs from 'fs';
import https from 'https';
import { render } from '../../src/index'; // Import your SSR render function

const app = express();
const port = process.env.PORT || 3000;

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('./ssl/localhost-key.pem'),
  cert: fs.readFileSync('./ssl/localhost.pem'),
};

app.use(express.static('dist')); // Serve static files

app.get('*', (req, res) => {
  const html = render(req); // Call your SSR render function
  res.send(html);
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`🚀 Server is running at https://localhost:${port}`);
});
