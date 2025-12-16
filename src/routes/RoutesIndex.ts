import express, { Router, Request, Response } from "express";
import produtos from "./produtosRoutes";
import relatorios from "./relatoriosRoutes";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const message = "Bem-Vindo ao servidor da LogisScore";
    res.status(200).send(message);
});

router.use("/produtos", produtos);
router.use("/relatorios", relatorios);

export default router;
