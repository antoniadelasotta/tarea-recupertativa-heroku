const express = require('express');

const db = require('../../../models');
/*const { User } = db;*/

const router = express.Router();

/* req y res siempre se recive */
/* req contiene toda la info que viene desde el request */
/* res es lo que se envia como respuesta */
router.get('/', (req, res) => {
    res.status(200).send('Hello World!');
    }
);

/* Aqui exporto al router */
module.exports = router;