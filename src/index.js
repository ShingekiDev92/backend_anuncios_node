const express = require('express');
const app = express();
const PORT = 3000;

app.get("/",function(req,res){
    return res.json({mensaje:"Bienvenido a mi servicio backend con node"});
});

app.listen(PORT,function(){
    console.log(`Servidor iniciado en : http://127.0.0.1:${PORT}`);
});