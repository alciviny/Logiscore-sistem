import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/RoutesIndex.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);

export default app;

