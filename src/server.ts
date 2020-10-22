import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(5000, () => {
  console.log('Back-end server started!');
});

export default app;
