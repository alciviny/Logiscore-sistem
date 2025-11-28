import express from 'express';
import produtos from "./produtosRoutes.js";
import relatorios from "./relatoriosRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
    const message = "Bem-Vindo ao servidor da LogicScore";
    res.status(200).send(message);
});

router.use('/produtos', produtos);
router.use('/relatorios', relatorios);

export default router;