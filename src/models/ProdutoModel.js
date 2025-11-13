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
            type:mongoose.Schema.Types.ObjectId,
            ref:'categoria',
            required:true
        }
    },
  
    {
        timestamps: true
    }
);


const ProdutoModel = mongoose.model('Produto', produtoSchema);

export default ProdutoModel;
