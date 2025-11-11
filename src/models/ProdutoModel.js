import mongoose  from "mongoose";

const produtoSchema = new mongoose.Schema(
    {
        nome: String,
        required:[true, " o campo 'nome' é obrigatorio"]
    },
    {
        SKU:String,
        required:[true,"o campo 'sku' é obrigatorio"],
        unique: true,
    },
    {
        quantidade:Number,
        required:[true,"campo com quantidade é obrigatoria"],
        min:[0,"a quantidade nao pode ser negativa"],
        default:0
    },
    {
        localizacao:String,
        required:[true,"o campo com o local do item é obrigatorio"]
    },
    {
       timestamps: true 
    }

)