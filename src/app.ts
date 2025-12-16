import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/RoutesIndex';
import path from 'path';
import connectDatabase from './config/configMongoDb';

const app: Express = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', routes);

export default app;
