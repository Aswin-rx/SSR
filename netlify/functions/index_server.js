import express from 'express';
import serverless from 'serverless-http';
import { render } from '../../src/index';  // Import your SSR render function

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));  // Serve static files from 'dist'

app.get('*', (req, res) => {
  const html = render(req);  // Call your SSR render function
  res.send(html);  // Send the generated HTML as response
});

// Check if running in a serverless environment
if (!process.env.IS_SERVERLESS) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// Export handler for serverless platforms (like AWS Lambda)
export const handler = serverless(app);
