import mongoose  from "mongoose"

const connectDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB)
        console.log('conectado ao banco de dados')
    }catch(error){
        console.error('erri ao se conectar ao banco de dados',error)
        process.exit(1)
    }
}
export default connectDatabase;