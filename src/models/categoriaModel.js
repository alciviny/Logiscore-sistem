import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:[true,"o campo 'nome' é obrigatorio"],
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[3,"o campo 'nome' deve ter no minimo 3 caracteres"]
    },
    descricao:{
        type:String
    },
    status:{
        type:String,
        enum:['ativo','inativo'],
        default:'ativo',
        required:[true,"o campo 'status' é obrigatorio"],
        trim:true,
        lowercase:true

        
    }
}, {
    timestamps: true,
})

const CategoriaModel = mongoose.model('categoria', categoriaSchema)

export default Categoria