import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/RoutesIndex.js';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors())


app.use('/', routes);

export default app;

