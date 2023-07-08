const Users = require("../model/user.js");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    const search = await Users.findOne({ where: { email: email } });
    if (search) {
      console.log("email already exist");
      res.status(403).json({ message: "email exist" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        password = hash;
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          await Users.create({
            name: name,
            email: email,
            password: password,
          });
          res.status(201).json({ message: "updated" });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    // console.log(user,'hi');
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).json({
            message: "Logged in Successfully",
          });
        } else {
          res.status(401).json({ message: "Wrong Password" });
        }
      })
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
