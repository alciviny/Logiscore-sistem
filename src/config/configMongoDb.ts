import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB as string);
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.error("Erro ao se conectar ao banco de dados", error);
        process.exit(1);
    }
};

export default connectDatabase;
