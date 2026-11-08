const express = require('express');
const Route = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite recibir JSON en el cuerpo de las peticiones.
app.use(express.json());

app.get("/", function(req, res){
    return res.json({mensaje:"Bienvenido a mi servicio backend con node"});
});

// Rutas de la API (categorias y publicaciones)
app.use("/api", Route);

app.listen(PORT,function(){
    console.log(`Servidor iniciado en : http://127.0.0.1:${PORT}`);
});
