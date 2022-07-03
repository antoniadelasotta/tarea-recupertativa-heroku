const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const db = require('../../../models');


// http://localhost:3000/publication/ (GET para obtener todo el contenido)
router.get('/', async (req, res) => {
  try {
    const contenido = await db.contenido.findAll();
    res.send({ contenido: contenido });
  } catch {
    res.status(400);
  }
});

// http://localhost:3000/content/id (GET para obtener content por id)
router.get('/:id', async (req, res) => {
  const contenido = await db.contenido.findOne({ where: { id: req.params.id } });
  if (contenido === null) {
    res.send({ mensaje: "No existe contenido con id = " + req.params.id });
  }
  res.send({ contenido: contenido });
});

// http://localhost:3000/content/ (POST para crear content)
router.post('/', async (req, res) => {
  try {
    const new_contenido = await db.contenido.create(req.body);
    res.status(201).send({ contenido: new_contenido });
  } catch {
    res.status(400);
  }
});

// http://localhost:3000/content/id (DELETE para eliminar content por id)
router.delete('/:id', async (req, res) => {
  const contenido = await db.contenido.findOne({ where: { id: req.params.id } });
  if (contenido === null) {
    res.send({ mensaje: "No existe contenido con id = " + req.params.id });
  }
  await contenido.destroy();
  res.send({ mensaje: "Contenido eliminado" });
});

/* Aqui exporto al router */
module.exports = router;