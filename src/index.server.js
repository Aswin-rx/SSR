import express from 'express';
import serverless from 'serverless-http';  // Import serverless-http
import { render } from './index';  // Import your render function

const app = express();
const port = 3000;

app.use(express.static('dist'));  // Serve static files from the 'dist' folder

app.get('*', (req, res) => {
  const html = render();  // Call your SSR render function
  res.send(html);  // Send the generated HTML as the response
});

// Wrap the Express app with serverless-http
export const handler = serverless(app);
