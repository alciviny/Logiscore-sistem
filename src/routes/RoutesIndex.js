import produtosRoutes from "./produtosRoutes";
 const routes = (app) => {
    app.route("/").get((req, res)=>{
        const mensage = "Bem-Vindo ao servidor da  LogicStream";
        res.status(200).send(mensage);
    })

    app.use(produtosRoutes);
}

export default routes;