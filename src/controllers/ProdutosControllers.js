
import axios from 'axios'
 
 class Produtos {
   static async ProdutosGet(req,res){
     const response =await fetch(process.env.MONGODB)
     if(!response){
       return []
     }
     try{
        res.status(200).json(response)
     }
     catch(error){
      const mensagem = "nao foi possivel  se conectar ao banco de dados"
      console.log("nao conseguimos puxar os dados do banco de dados ",error)
      res.status(500).send(mensagem)
     }
   }
   static async ProdutosDelete(req,res){

   }
   static async ProdutosPut(req,res){

   }
   static async ProdutosPost(req,res){
    const produtos = req.body
    const response = await axios.post(process.env.MONGODB,produtos)
    .then(response.data)
   }
 }

 export default Produtos;