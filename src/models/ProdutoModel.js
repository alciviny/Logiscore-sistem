import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  
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
        localizacao: {
            type: String,
            required: [true, "O campo 'localizacao' é obrigatório"]
        },
        categoria:{
            // type:mongoose.Schema.Types.ObjectId,
            // ref:'categoria',
            // required:true
        },
        status: {
            type: String,
            required: [true,"campo obrigatorio"],
            default: "Em estoque",
            enum: ["Em estoque", "Baixo estoque", "Fora de estoque"]
        }
    },
  
    {
        timestamps: true
    }
);


const ProdutoModel = mongoose.model('Produto', produtoSchema);

export default ProdutoModel;
