import express from 'express';
import { render } from './index';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const html = render();
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});