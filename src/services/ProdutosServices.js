import { Error } from "mongoose";
import ProdutoModel from "../models/ProdutoModel.js";
import CategoriaModel from "../models/categoriaModel.js";


class ProdutosServices{
    static async Produtos(){
        try{
        const produtos = await ProdutoModel.find()
        return produtos}catch(error){
            throw new Error('nao foi possivel encontrar os produtos: ' )
        }
        
}
    static async cadastrarProdutos(dadosProduto){
    try{
        // Valida categoria apenas se for informada
        if (dadosProduto.categoria) {
            const categoria = await CategoriaModel.findById(dadosProduto.categoria);
            if (!categoria) {
                throw new Error('Categoria não encontrada');
            }
        }
        const produto = await ProdutoModel.create(dadosProduto);
        return produto;
    }

    catch(error){
       throw new Error(`nao foi possivel adicionar produto: ${error.message}`)
    }

}
    static async deletarProduto(id){
    try{
        const response = await ProdutoModel.findByIdAndDelete(id);
        return response;

    }catch(error){
        throw new Error('nao foi possivel deletar o produto')
    }
}
    static async atualizarProduto(id,dadosAtualizados){
    try{
        const response = await ProdutoModel.findByIdAndUpdate(id,dadosAtualizados,{new:true})
        return response
    }catch(error){
        throw new Error("nao foi possivel atualizar os dados do produto");
        
    }
}
}
export default ProdutosServices; 