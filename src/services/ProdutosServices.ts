import ProdutoModel, { IProduto } from "../models/ProdutoModel";
import CategoriaModel from "../models/categoriaModel";

class ProdutosServices {
    static async Produtos(): Promise<IProduto[]> {
        try {
            const produtos = await ProdutoModel.find();
            return produtos;
        } catch (error) {
            throw new Error("Não foi possível encontrar os produtos");
        }
    }

    static async cadastrarProdutos(dadosProduto: Partial<IProduto>): Promise<IProduto> {
        try {
            if (dadosProduto.categoria) {
                const categoria = await CategoriaModel.findById(dadosProduto.categoria);
                if (!categoria) {
                    throw new Error("Categoria não encontrada");
                }
            }
            const produto = await ProdutoModel.create(dadosProduto);
            return produto;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Não foi possível adicionar produto: ${errorMessage}`);
        }
    }

    static async deletarProduto(id: string): Promise<IProduto | null> {
        try {
            const response = await ProdutoModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error("Não foi possível deletar o produto");
        }
    }

    static async atualizarProduto(
        id: string,
        dadosAtualizados: Partial<IProduto>
    ): Promise<IProduto | null> {
        try {
            const response = await ProdutoModel.findByIdAndUpdate(id, dadosAtualizados, {
                new: true
            });
            return response;
        } catch (error) {
            throw new Error("Não foi possível atualizar os dados do produto");
        }
    }
}

export default ProdutosServices;
