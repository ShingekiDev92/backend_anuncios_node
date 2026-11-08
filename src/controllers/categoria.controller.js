const { categorias, publicaciones, siguienteId } = require("../data/in-memory");

// GET /api/categorias
function listarCategorias(req, res) {
    return res.status(200).json(categorias);
}

// GET /api/categorias/:id
function obtenerCategoria(req, res) {
    const id = Number(req.params.id);
    const categoria = categorias.find((c) => c.id === id);

    if (!categoria) {
        return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

    return res.status(200).json(categoria);
}

// POST /api/categorias
function crearCategoria(req, res) {
    const { nombre, descripcion } = req.body || {};

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }

    const categoria = {
        id: siguienteId(categorias),
        nombre: nombre.trim(),
        descripcion: typeof descripcion === "string" ? descripcion.trim() : ""
    };

    categorias.push(categoria);

    return res.status(201).json(categoria);
}

// PUT /api/categorias/:id
function actualizarCategoria(req, res) {
    const id = Number(req.params.id);
    const categoria = categorias.find((c) => c.id === id);

    if (!categoria) {
        return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

    const { nombre, descripcion } = req.body || {};

    if (nombre !== undefined) {
        if (typeof nombre !== "string" || nombre.trim() === "") {
            return res.status(400).json({ mensaje: "El campo 'nombre' no puede estar vacio" });
        }
        categoria.nombre = nombre.trim();
    }

    if (descripcion !== undefined) {
        if (typeof descripcion !== "string") {
            return res.status(400).json({ mensaje: "El campo 'descripcion' debe ser texto" });
        }
        categoria.descripcion = descripcion.trim();
    }

    return res.status(200).json(categoria);
}

// DELETE /api/categorias/:id
function eliminarCategoria(req, res) {
    const id = Number(req.params.id);
    const indice = categorias.findIndex((c) => c.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

    const tienePublicaciones = publicaciones.some((p) => p.categoriaId === id);
    if (tienePublicaciones) {
        return res.status(409).json({
            mensaje: "No se puede eliminar la categoria porque tiene publicaciones asociadas"
        });
    }

    const [eliminada] = categorias.splice(indice, 1);

    return res.status(200).json({
        mensaje: "Categoria eliminada",
        categoria: eliminada
    });
}

module.exports = {
    listarCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
