import { Request, Response } from "express";
import ProdutoModel from "../models/ProdutoModel";

class RelatoriosController {
    static async getDashboardData(req: Request, res: Response): Promise<void> {
        try {
            const [
                totalProdutos,
                baixoEstoqueResult,
                porLocalizacao,
                valorTotalEstoqueResult,
                distribuicaoStatus,
                top5Produtos,
                produtosEsgotados
            ] = await Promise.all([
                ProdutoModel.countDocuments({}),

                ProdutoModel.aggregate([
                    {
                        $match: {
                            $expr: {
                                $lte: ["$quantidade", "$estoqueMinimo"]
                            }
                        }
                    },
                    { $count: "total" }
                ]),

                ProdutoModel.aggregate([
                    { $group: { _id: "$localizacao", count: { $sum: 1 } } },
                    { $project: { _id: 0, localizacao: "$_id", quantidade: "$count" } },
                    { $sort: { localizacao: 1 } }
                ]),

                ProdutoModel.aggregate([
                    {
                        $group: {
                            _id: null,
                            valorTotal: {
                                $sum: {
                                    $multiply: ["$quantidade", { $ifNull: ["$preco", 0] }]
                                }
                            }
                        }
                    }
                ]),

                ProdutoModel.aggregate([
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]),

                ProdutoModel.aggregate([
                    { $sort: { quantidade: -1 } },
                    { $limit: 5 },
                    { $project: { _id: 0, nome: 1, quantidade: 1 } }
                ]),

                ProdutoModel.find({ quantidade: 0 }).select("nome SKU -_id")
            ]);

            const valorTotalEstoque =
                valorTotalEstoqueResult.length > 0 ? valorTotalEstoqueResult[0].valorTotal : 0;
            const baixoEstoque =
                baixoEstoqueResult.length > 0 ? baixoEstoqueResult[0].total : 0;

            const dashboardData = {
                totalProdutos,
                baixoEstoque,
                porLocalizacao,
                valorTotalEstoque,
                distribuicaoStatus,
                top5Produtos,
                produtosEsgotados
            };

            res.status(200).json(dashboardData);
        } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao processar sua solicitação."
            });
        }
    }

    static async getProdutosCriticos(req: Request, res: Response): Promise<void> {
        try {
            const produtosCriticos = await ProdutoModel.find({
                $expr: {
                    $lte: ["$quantidade", "$estoqueMinimo"]
                }
            }).sort({ quantidade: 1 });

            res.status(200).json(produtosCriticos);
        } catch (error) {
            console.error("Erro ao buscar produtos críticos:", error);
            res.status(500).json({
                message: "Erro interno do servidor ao processar sua solicitação."
            });
        }
    }
}

export default RelatoriosController;
