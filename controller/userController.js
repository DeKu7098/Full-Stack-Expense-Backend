const Users = require("../model/user.js");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const search = await Users.findOne({ where: { email: email } });
    if (search) {
      console.log("email already exist");
      res.status(403).json({ message: "email exist" });
    } else {
      await Users.create({
        name: name,
        email: email,
        password: password,
      });
      res.status(201).json({ message: "updated" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
