const Users = require('../model/user.js');

async function addUser(req, res) {
    try {
      const name1 = await req.body.name;
      const email1 = await req.body.email;
      var password1 = await req.body.password;
      const search = await Users.findOne({ where: { email: email1 } });
      if (search) {
        console.log("email already exist");
        res.status(403).json({ message: "email exist" });
      } else {
        
            await Users.create(
              {
                name: name1,
                email: email1,
                password: password1
              }
            );
            res.status(201).json({ message: "updated" });
          }
      }catch (err) {
        res.status(500).json({ message: "Something went wrong" });
      }
    } 

  module.exports = { addUser };