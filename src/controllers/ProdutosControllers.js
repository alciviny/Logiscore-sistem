import ProdutosServices from '../services/ProdutosServices.js'

 
 class Produtos {
   static async ProdutosGet(req,res){
    try{
     const response = await ProdutosServices.Produtos();

     res.status(200).json(response)
    }
    catch(error){
      res.status(500).json(error)
      
      
    }
   }
   static async ProdutosDelete(req,res){
    try{
      const {id}= req.params;
      const response = await ProdutosServices.deletarProduto(id)
      res.status(200).json({ mensagem: "produto deletado" })
    }
    catch(error){
      const mensagem= `produto nao deletado ${error}`
      res.status(500).json(mensagem)
      
    }
   }
   static async ProdutosPut(req,res){
    const {id}= req.params;
    const produtos = req.body;
    if(!id || !produtos){
      const mensagem= `nao foi possivel deletar produto :${error}`
      res.status(500).json(mensagem)
       
          
     }
    try{
      const response = await ProdutosServices.atualizarProduto(id,produtos)
      res.status(200).json(response)
    }
    catch(error){
      const mensagem= `nao foi possivel atualizar produto :${error}`
      res.status(500).json(mensagem)
     
    }
   }
   static async ProdutosPost(req,res){
    const produto = req.body;
    if(!produto){
      return []
    }
    try{
      const response = await ProdutosServices.cadastrarProdutos(produto)
      res.status(200).json(response)
    }
    catch(error){
      const mensagem= `nao foi possivel adicionar produto ${error}`
      res.status(500).json(mensagem)
     
    }
   }
 }

 export default Produtos;