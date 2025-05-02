
const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await db.user.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send({ message: "Username already taken." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); 

    const newUser = await db.user.create({
      username,
      password: hashedPassword
    });

    res.status(201).send({ message: "User registered successfully.", data: newUser });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    if (req.body.password === user.dataValues.password) {


      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      res.status(200).send({  token: token });
    } else {

      res.status(500).send({ message: "Mismatch Password" });
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
