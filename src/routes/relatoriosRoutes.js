import express from 'express';
import RelatoriosController from '../controllers/RelatoriosController.js';

const router = express.Router();

// Rota de teste
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route is working!' });
});

// Rota para obter os dados do dashboard
router.get('/dashboard', RelatoriosController.getDashboardData);

// Rota para obter a lista de produtos em estado crítico
router.get('/produtos-criticos', RelatoriosController.getProdutosCriticos);

export default router;
