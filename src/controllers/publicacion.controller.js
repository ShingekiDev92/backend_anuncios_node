const { categorias, publicaciones, siguienteId } = require("../data/in-memory");

// GET /api/publicaciones
// Permite filtrar por categoria: /api/publicaciones?categoriaId=1
function listarPublicaciones(req, res) {
    const { categoriaId } = req.query;

    if (categoriaId !== undefined) {
        const id = Number(categoriaId);
        if (Number.isNaN(id)) {
            return res.status(400).json({ mensaje: "El filtro 'categoriaId' debe ser numerico" });
        }
        return res.status(200).json(publicaciones.filter((p) => p.categoriaId === id));
    }

    return res.status(200).json(publicaciones);
}

// GET /api/publicaciones/:id
function obtenerPublicacion(req, res) {
    const id = Number(req.params.id);
    const publicacion = publicaciones.find((p) => p.id === id);

    if (!publicacion) {
        return res.status(404).json({ mensaje: "Publicacion no encontrada" });
    }

    return res.status(200).json(publicacion);
}

// POST /api/publicaciones
function crearPublicacion(req, res) {
    const { titulo, descripcion, precio, categoriaId, activo } = req.body || {};

    if (typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ mensaje: "El campo 'titulo' es obligatorio" });
    }

    if (precio === undefined || Number.isNaN(Number(precio)) || Number(precio) < 0) {
        return res.status(400).json({ mensaje: "El campo 'precio' debe ser un numero mayor o igual a 0" });
    }

    if (categoriaId === undefined) {
        return res.status(400).json({ mensaje: "El campo 'categoriaId' es obligatorio" });
    }

    const idCategoria = Number(categoriaId);
    const categoriaExiste = categorias.some((c) => c.id === idCategoria);
    if (!categoriaExiste) {
        return res.status(400).json({ mensaje: "La categoria indicada no existe" });
    }

    const publicacion = {
        id: siguienteId(publicaciones),
        titulo: titulo.trim(),
        descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
        precio: Number(precio),
        categoriaId: idCategoria,
        activo: activo === undefined ? true : Boolean(activo)
    };

    publicaciones.push(publicacion);

    return res.status(201).json(publicacion);
}

// PUT /api/publicaciones/:id
function actualizarPublicacion(req, res) {
    const id = Number(req.params.id);
    const publicacion = publicaciones.find((p) => p.id === id);

    if (!publicacion) {
        return res.status(404).json({ mensaje: "Publicacion no encontrada" });
    }

    const { titulo, descripcion, precio, categoriaId, activo } = req.body || {};

    if (titulo !== undefined) {
        if (typeof titulo !== "string" || titulo.trim() === "") {
            return res.status(400).json({ mensaje: "El campo 'titulo' no puede estar vacio" });
        }
        publicacion.titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
        if (typeof descripcion !== "string") {
            return res.status(400).json({ mensaje: "El campo 'descripcion' debe ser texto" });
        }
        publicacion.descripcion = descripcion.trim();
    }

    if (precio !== undefined) {
        if (Number.isNaN(Number(precio)) || Number(precio) < 0) {
            return res.status(400).json({ mensaje: "El campo 'precio' debe ser un numero mayor o igual a 0" });
        }
        publicacion.precio = Number(precio);
    }

    if (categoriaId !== undefined) {
        const idCategoria = Number(categoriaId);
        const categoriaExiste = categorias.some((c) => c.id === idCategoria);
        if (!categoriaExiste) {
            return res.status(400).json({ mensaje: "La categoria indicada no existe" });
        }
        publicacion.categoriaId = idCategoria;
    }

    if (activo !== undefined) {
        publicacion.activo = Boolean(activo);
    }

    return res.status(200).json(publicacion);
}

// DELETE /api/publicaciones/:id
function eliminarPublicacion(req, res) {
    const id = Number(req.params.id);
    const indice = publicaciones.findIndex((p) => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Publicacion no encontrada" });
    }

    const [eliminada] = publicaciones.splice(indice, 1);

    return res.status(200).json({
        mensaje: "Publicacion eliminada",
        publicacion: eliminada
    });
}

module.exports = {
    listarPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
};
