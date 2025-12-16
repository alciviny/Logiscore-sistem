import app from './app';
import connectDatabase from './config/configMongoDb';

connectDatabase();

const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});