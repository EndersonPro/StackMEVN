const express = require("express");

const app = express();
const User = require("../models/UserModel");

app.get("/user/get", (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      res.json({
        state: false,
        users: null
      });
    res.json({
      state: true,
      users
    });
  });
});

app.post("/user/create", (req, res) => {
  const body = req.body;

  let newUser = new User({
    username: body.username,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email
  });

  newUser.save((err, user) => {
    if (err)
      res.json({
        state: false,
        user: null
      });
    res.json({
      state: true,
      user
    });
  });
});

app.put("/user/:id/update", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const opts = {
    new: true
  };

  User.findOneAndUpdate({ "_id": id }, body, opts, (err, user) => {
     if (err)
      res.json({
        state: false,
        err,
        message: `Usuario con el id ${id} no se encontro o no existe`,
        user: null
      });
      res.json({
        state: true,
        message: "Usuario Actualizado correctamente",
        user
      });
  }); 
});


app.delete("/user/:id/delete", (req, res) => {
  const id = req.params.id;
  User.findOneAndDelete({"_id": id}, (err, user) => {
    if (err)
      res.json({
        state: false,
        err,
        message: "Ocurrio un error en la eliminacion",
        task: null
      });
    res.json({
      state: true,
      message: "Usuario eliminado correctamente",
      user
    });
  });
});

module.exports = app;
