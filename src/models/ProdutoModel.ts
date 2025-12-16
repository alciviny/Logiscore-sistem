import mongoose, { Document, Schema, model } from "mongoose";


export interface IProduto extends Document {
    nome: string;
    SKU: string;
    preco: number;
    quantidade: number;
    estoqueMinimo: number;
    localizacao: string;
    categoria: string; 
    status: "Em estoque" | "Baixo estoque" | "Fora de estoque";
    createdAt?: Date;
    updatedAt?: Date;
}

const produtoSchema = new Schema<IProduto>(
    {
        nome: {
            type: String,
            required: [true, "O campo 'nome' é obrigatório"]
        },
        SKU: {
            type: String,
            required: [true, "O campo 'SKU' é obrigatório"],
            unique: true
        },
        preco: {
            type: Number,
            required: [true, "O campo 'preco' é obrigatório"],
            default: 0,
            min: [0, "O preço não pode ser negativo"]
        },
        quantidade: {
            type: Number,
            required: [true, "O campo 'quantidade' é obrigatório"],
            min: [0, "A quantidade não pode ser negativa"],
            default: 0
        },
        estoqueMinimo: {
            type: Number,
            required: [true, "O campo 'estoqueMinimo' é obrigatório"],
            default: 5,
            min: [0, "O estoque mínimo não pode ser negativo"]
        },
        localizacao: {
            type: String,
            required: [true, "O campo 'localizacao' é obrigatório"]
        },
        categoria: {
            type: String // Temporário
        },
        status: {
            type: String,
            required: [true, "Campo 'status' é obrigatório"],
            default: "Em estoque",
            enum: ["Em estoque", "Baixo estoque", "Fora de estoque"]
        }
    },
    {
        timestamps: true // Adiciona createdAt e updatedAt automaticamente
    }
);

const ProdutoModel = model<IProduto>('Produto', produtoSchema);

export default ProdutoModel;
