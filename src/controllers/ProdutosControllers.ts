import { Request, Response } from "express";
import ProdutosServices from "../services/ProdutosServices";

class Produtos {
    static async ProdutosGet(req: Request, res: Response): Promise<void> {
        try {
            const response = await ProdutosServices.Produtos();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async ProdutosDelete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await ProdutosServices.deletarProduto(id);
            res.status(200).json({ mensagem: "produto deletado" });
        } catch (error) {
            const mensagem = `Produto não deletado: ${error}`;
            res.status(500).json(mensagem);
        }
    }

    static async ProdutosPut(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const produtos = req.body;

        if (!id || !Object.keys(produtos).length) {
            const mensagem = "Dados insuficientes para a atualização.";
            res.status(400).json({ message: mensagem });
            return;
        }

        try {
            const response = await ProdutosServices.atualizarProduto(id, produtos);
            res.status(200).json(response);
        } catch (error) {
            const mensagem = `Não foi possível atualizar produto: ${error}`;
            res.status(500).json(mensagem);
        }
    }

    static async ProdutosPost(req: Request, res: Response): Promise<void> {
        const produto = req.body;

        if (!produto) {
            res.status(400).json([]);
            return;
        }

        try {
            const response = await ProdutosServices.cadastrarProdutos(produto);
            res.status(200).json(response);
        } catch (error) {
            const mensagem = `Não foi possível adicionar produto: ${error}`;
            res.status(500).json(mensagem);
        }
    }
}

export default Produtos;
