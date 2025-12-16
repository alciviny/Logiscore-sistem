import express, { Router } from "express";
import Produtos from "../controllers/ProdutosControllers";

const rota: Router = express.Router();

rota.get("/", Produtos.ProdutosGet);
rota.patch("/:id", Produtos.ProdutosPut);
rota.delete("/:id", Produtos.ProdutosDelete);
rota.post("/", Produtos.ProdutosPost);

export default rota;
