require("dotenv").config();
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


const db = require('../../../models');


const { user } = db;

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}
/* req y res siempre se recibe */
/* req contiene toda la info que viene desde el request */
/* res es lo que se envia como respuesta */

router.get("/", async (req, res) => {
  try {
    const userFound = await user.findAll({});
    const result = userFound
    if (result) {

      res.status(200).json({ result: result });
    } else {
      res
        .status(400)
        .json({ error: "Algo mal" });
    }

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

});

router.get("/:id", async (req, res) => {
  try {
    const userFound = await user.findOne({
      where: { id: req.params.id },
    });
    if (userFound) {
      const response = {
        id: userFound.id,
        name: userFound.name,
        username: userFound.username,
        email: userFound.email,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

/* Sacado de la actividad */

router.post("/login/", async (req, res) => {

  const userFound = await user.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  // quizás al loggear deba guardar al user logeado?
  if (!userFound) {
    res.status(400).json({ error: "El usuario y la contraseña no coinciden" });
  } else {
    const result = true;
    if (result) {
      const token = await generateToken(userFound);
      const PreUser = {
        username: userFound.username,
        email: userFound.email,
        id: userFound.id,
        access_token: token
      };

      const toSend = {
        ...PreUser,
        access_token: token,
        token_type: 'bearer',
      }

      res.status(200).json(toSend);
    } else {
      res
        .json({ error: error.message });
    }
  }
});

router.post("/sign-up/", async (req, res) => {
  try {

    if (req.body.password === req.body.passwordConfirmation) {
      console.log(req.body.username);
      const existingUser = await user.findOne({
        where: { username: req.body.username },
      });
      console.log(existingUser);

      if (existingUser) {
        res.status(200).json({ error: error.message });
      } else {
        const newuser = await user.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        res.status(201).json(newuser);
      }
    } else {
      res.status(400).json({ error: "Contraseñas no coinciden" });
    }
  } catch (e) {
    res.status(200).json({ e: e.message });
  }
});



router.patch('/edit/:id', async (ctx, res) => {

  const user_id = ctx.params.id;

  const _user = await user.findOne({ where: { id: user_id } })
  const data = ctx.body
  const _email = data.email ? data.email : _user.email;
  // const _password = data.password || _user.password;
  const _name = data.name ? data.name : _user.name;
  try {
    await _user.update({ email: _email, name: _name });
    res.body = _user; // quizas por esto el front no recibe el updated
    res.status(201).send({ updated: true });
  }
  catch (err) {
    res.status(401).send({ updated: false });
  }
});

router.patch('/:id', async (ctx, res) => {

  const user_id = ctx.params.id;

  const _user = await user.findOne({ where: { id: user_id } });
  const data = ctx.body;
});

router.delete('/:id', async (ctx, res) => {
  const user_id = ctx.params.id;

  const _user = await user.findOne({ where: { id: user_id } })

  console.log(_user)
  if (_user) {
    try {
      await _user.destroy();
      res.status(200).send({ error: 'Usuario eliminado' });
    }
    catch (err) {
      res.status(204).send({ error: 'Usuario no encontrado' });

    }
  } else {
    console.log(_user)
    res.status(200).send({ error: 'Usuario no encontrado' });
  };
}
);


/* Aqui exporto al router */
module.exports = router;