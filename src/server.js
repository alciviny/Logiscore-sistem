import app from './app.js'
import connectDatabase from './config/configMongoDb.js'

connectDatabase();

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`servidor rodando no http://localhost:${PORT}`)
})