import express from "express";
import userRoutes from "./routes/usuarioRoutes";
import commentRoutes from "./routes/comentarioRoutes";
import hackerMalvadao from "./routes/hackerMalvadaoRoutes";
import { createClient } from 'redis';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const cookiesParser = require("cookie-parser");
app.use(cookiesParser());


(global as any).segredoJwt = "Tnlmaslkcalsdfkalj0129iT";
app.use("/usuario", userRoutes);
app.use("/comentario", commentRoutes);
app.use("/hacker-malvadao", hackerMalvadao);

app.listen(3001, () => {
    console.log("Servidor Vulnerável rodando na porta 3001");
});

const redis = createClient({
    url:"redis://localhost:6379"
});

async function iniciarServidor() {

    await redis.connect();

    console.log("Redis conectado!");

    (global as any).redis = redis;

    app.listen(3001, () => {
        console.log("Servidor Vulnerável rodando na porta 3001");
    });
}

iniciarServidor().catch(err => {
    console.error("Erro ao iniciar servidor:", err);
});