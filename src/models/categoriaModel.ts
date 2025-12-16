import mongoose, { Document, Schema, model } from "mongoose";

export interface ICategoria extends Document {
    nome: string;
    descricao?: string;
    status: "ativo" | "inativo";
    createdAt?: Date;
    updatedAt?: Date;
}

const categoriaSchema = new Schema<ICategoria>(
    {
        nome: {
            type: String,
            required: [true, "O campo 'nome' é obrigatório"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "O campo 'nome' deve ter no mínimo 3 caracteres"]
        },
        descricao: {
            type: String
        },
        status: {
            type: String,
            enum: ["ativo", "inativo"],
            default: "ativo",
            required: [true, "O campo 'status' é obrigatório"],
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
);

const CategoriaModel = model<ICategoria>("categoria", categoriaSchema);

export default CategoriaModel;
