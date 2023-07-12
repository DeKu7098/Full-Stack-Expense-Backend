const User = require("../model/user");

const sequelize = require("../db/connect.js");

const Sib = require("sib-api-v3-sdk");

const Password = require('../model/password');

const { v4: uuidv4 } = require("uuid");

const path = require('path');

const bcrypt = require("bcrypt");



exports.generateLink = async (req, res, next) => {
    
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    //   console.log(user);
    if (user) {
      const client = Sib.ApiClient.instance; // used for sending mail
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.API_KEY;
      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: process.env.EMAIL,
      };
      const uuid = uuidv4();
      const receivers = [
        {
          email: req.body.email,
        },
      ];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Reset your password from here",
        textContent:
          "We have requested to reset your password from expense tracker click on the below link to reset http://localhost:3000/password/resetpassword/" +
          uuid,
      });
      await Password.create({id: uuid, isactive: true, userId: user.id})
    } else {
      res.status(404).json({ message: "USER NOT FOUND" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.uuidValidator = async (req, res, next) => {
    try {
        const id = req.params.uuid;
        const user = await Password.findOne({ where: { id: id } });
        if (user) {
          if (user.isactive == true) {
            res.sendFile(path.join(__dirname, "../", "/Frontend", "/resetPassword.html"));
          } else {
            res.sendFile(path.join(__dirname, "../", "/Frontend", "/404.html"));
          }
        } else {
          res.sendFile(path.join(__dirname, "../", "/Frontend", "/404.html"));
        }
      } catch (err) {
        res.status(500).json({ message: "Something went wrong " });
      }
};

exports.createPassword = async (req, res, next) => {
    try{
        const uuid = req.body.uuid;
        const newPass = req.body.newPass;
        const user = await Password.findOne({where: {id: uuid}});
        await user.update({isactive: false});
        const user1 = await User.findOne({where: {id: user.userId}});
        const saltrounds = 10;
        const hashpass=await bcrypt.hash(newPass, saltrounds)
        await user1.update({ password: hashpass });
        res.status(200).json({ message: "password changed successfully" });
    } catch (err) {
        res.status(500).json({message:"SOmething went wrong"});
    }
    
}
