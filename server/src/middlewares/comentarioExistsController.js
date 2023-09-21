// Importamos la función que nos permite obtener una conexión a la base de datos.
const getDb = require('../db/getDb');

// Importamos las funciones de error.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que se conectará a la base de datos y comprobará
// si existe un tweet con el id que obtenemos por path params.
const comentarioExistsController = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const { comentarioId } = req.params;

        const [comentarios] = await connection.query(
            `SELECT id FROM tweets WHERE id = ?`,
            [comentarioId]
        );

        if (comentarios.length < 1) {
            notFoundError('comentario');
        }

        // Pasamos el control al siguiente middleware.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = comentarioExistsController;
