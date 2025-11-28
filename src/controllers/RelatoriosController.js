import ProdutoModel from '../models/ProdutoModel.js';

class RelatoriosController {
    /**
     * @description Busca dados agregados para o dashboard de relatórios.
     * @route GET /relatorios/dashboard
     * @access Private
     */
    static async getDashboardData(req, res) {
        try {
            // Executa as consultas em paralelo para maior eficiência
            const [
                totalProdutos,
                baixoEstoqueResult,
                porLocalizacao,
                valorTotalEstoqueResult,
                distribuicaoStatus,
                top5Produtos,
                produtosEsgotados
            ] = await Promise.all([
                // Contagem total de documentos (produtos)
                ProdutoModel.countDocuments({}),

                // Contagem de produtos onde a quantidade é menor ou igual ao estoque mínimo
                ProdutoModel.aggregate([
                    {
                        $match: {
                            $expr: {
                                $lte: ['$quantidade', '$estoqueMinimo']
                            }
                        }
                    },
                    { $count: 'total' }
                ]),

                // Agregação para quantidade de produtos por localização
                ProdutoModel.aggregate([
                    { $group: { _id: '$localizacao', count: { $sum: 1 } } },
                    { $project: { _id: 0, localizacao: '$_id', quantidade: '$count' } },
                    { $sort: { localizacao: 1 } }
                ]),

                // Agregação para calcular o valor total do estoque (preco * quantidade)
                ProdutoModel.aggregate([
                    {
                        $group: {
                            _id: null,
                            valorTotal: {
                                $sum: {
                                    $multiply: ['$quantidade', { $ifNull: ['$preco', 0] }]
                                }
                            }
                        }
                    }
                ]),

                // Agregação para contagem de produtos por status
                ProdutoModel.aggregate([
                    { $group: { _id: '$status', count: { $sum: 1 } } }
                ]),

                // Agregação para encontrar os 5 produtos com maior quantidade
                ProdutoModel.aggregate([
                    { $sort: { quantidade: -1 } },
                    { $limit: 5 },
                    { $project: { _id: 0, nome: 1, quantidade: 1 } }
                ]),

                // Query para encontrar produtos com quantidade igual a 0
                ProdutoModel.find({ quantidade: 0 }).select('nome SKU -_id')
            ]);

            // Extrai o valor total do resultado da agregação
            const valorTotalEstoque = valorTotalEstoqueResult.length > 0 ? valorTotalEstoqueResult[0].valorTotal : 0;
            const baixoEstoque = baixoEstoqueResult.length > 0 ? baixoEstoqueResult[0].total : 0;

            // Monta o objeto de resposta final
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
            console.error('Erro ao buscar dados do dashboard:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao processar sua solicitação.' });
        }
    }

    /**
     * @description Busca produtos em estado crítico (quantidade <= estoqueMinimo).
     * @route GET /relatorios/produtos-criticos
     * @access Private
     */
    static async getProdutosCriticos(req, res) {
        try {
            const produtosCriticos = await ProdutoModel.find({
                $expr: {
                    $lte: ['$quantidade', '$estoqueMinimo']
                }
            }).sort({ quantidade: 1 }); // Ordena por quantidade ascendente

            res.status(200).json(produtosCriticos);
        } catch (error) {
            console.error('Erro ao buscar produtos críticos:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao processar sua solicitação.' });
        }
    }
}

export default RelatoriosController;
