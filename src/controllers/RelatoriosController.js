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
            const [totalProdutos, baixoEstoque, porLocalizacao] = await Promise.all([
                ProdutoModel.countDocuments({}),
                ProdutoModel.countDocuments({ quantidade: { $lte: 5 } }),
                ProdutoModel.aggregate([
                    {
                        $group: {
                            _id: '$localizacao', // Agrupa pelo campo 'localizacao'
                            count: { $sum: 1 }    // Conta quantos documentos em cada grupo
                        }
                    },
                    {
                        $project: {
                            _id: 0, // Remove o campo _id
                            localizacao: '$_id', // Renomeia _id para localizacao
                            quantidade: '$count' // Renomeia count para quantidade
                        }
                    },
                    {
                        $sort: { localizacao: 1 } // Ordena por nome da localização
                    }
                ])
            ]);

            // Monta o objeto de resposta
            const dashboardData = {
                totalProdutos,
                baixoEstoque,
                porLocalizacao
            };

            res.status(200).json(dashboardData);
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao processar sua solicitação.' });
        }
    }
}

export default RelatoriosController;
