const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const db = require('../../../models');


// http://localhost:3000/publication/ (GET para obtener todas las playlist)
router.get('/', async (req, res) => {
  try {
    const playlists = await db.playlist.findAll();
    res.send({ playlists: playlists });
  } catch {
    res.status(400);
  }
});

// http://localhost:3000/playlist/id (GET para obtener playlist por id)
router.get('/:id', async (req, res) => {
  const playlist = await db.playlist.findOne({ where: { id: req.params.id } });
  if (playlist === null) {
    res.send({ mensaje: "No existe una playlist con id = " + req.params.id });
  }
  res.send({ playlist: playlist });
});

// http://localhost:3000/playlist/ (POST para crear una playlist)
router.post('/', async (req, res) => {
  try {
    const new_playlist = await db.playlist.create(req.body);
    res.status(201).send({ playlist: new_playlist });
  } catch {
    res.status(400);
  }
});

// http://localhost:3000/playlist/id (DELETE para eliminar una playlist por id)
router.delete('/:id', async (req, res) => {
  const playlist = await db.playlist.findOne({ where: { id: req.params.id } });
  if (playlist === null) {
    res.send({ mensaje: "No existe una playlist con id = " + req.params.id });
  }
  await playlist.destroy();
  res.send({ mensaje: "Playlist eliminada" });
});

/* Aqui exporto al router */
module.exports = router;