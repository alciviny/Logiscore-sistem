import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/RoutesIndex.js';

const app = express();

dotenv.config();
app.use(express.json());

app.use('/', routes);

export default app;

