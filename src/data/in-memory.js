// Almacen de datos en memoria (sin base de datos).
// Se reinicia cada vez que se reinicia el servidor.

const categorias = [
    { id: 1, nombre: "Tecnologia", descripcion: "Productos y servicios tecnologicos" },
    { id: 2, nombre: "Vehiculos", descripcion: "Autos, motos y repuestos" },
    { id: 3, nombre: "Hogar", descripcion: "Muebles y articulos para el hogar" }
];

const publicaciones = [
    {
        id: 1,
        titulo: "Laptop usada en buen estado",
        descripcion: "Laptop de 14 pulgadas, 16GB de RAM",
        precio: 4500,
        categoriaId: 1,
        activo: true
    },
    {
        id: 2,
        titulo: "Sofa de tres cuerpos",
        descripcion: "Sofa de tela en buen estado",
        precio: 1200,
        categoriaId: 3,
        activo: true
    }
];

// Devuelve el siguiente id disponible para una coleccion.
function siguienteId(coleccion) {
    return coleccion.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

module.exports = {
    categorias,
    publicaciones,
    siguienteId
};
