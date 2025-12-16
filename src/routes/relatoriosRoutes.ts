import express, { Router, Request, Response } from "express";
import RelatoriosController from "../controllers/RelatoriosController";

const router: Router = express.Router();

router.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "Test route is working!" });
});

router.get("/dashboard", RelatoriosController.getDashboardData);
router.get("/produtos-criticos", RelatoriosController.getProdutosCriticos);

export default router;
