class ProdutosServices{
    static async Produtos(){
        const urlProduto = process.env.URLPRODUTO
        if(urlProduto){
            try{
                const response = await axios.get(urlProduto)
            //////////////////////////////////////////////
                if(response.status !==200 || !response.data){
                    console.error('nao foi encontrado nenhum produto na requisicao')
                    return []
            }
            //////////////////////////////////////////////
                return response.data
            
        }
            catch(error){
                console.log('nao foi possivel encontrar o url da api, verifique o Env',+ error)
                return []
    };
    
    }
        
    }
}
export default ProdutosServices; 