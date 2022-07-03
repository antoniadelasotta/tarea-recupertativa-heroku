const express = require('express');

const router = express.Router();

const hello = require('./api/v1/hello.routes');
const user = require('./api/v1/user');
const playlist = require('./api/v1/playlist');
const contenido = require('./api/v1/contenido');

router.use('/hello', hello);
router.use('/user', user);
router.use('/playlist', playlist);
router.use('/contenido', contenido);


module.exports = router;