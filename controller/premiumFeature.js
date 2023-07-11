const User = require("../model/user");
const Expense = require("../model/expenses");
const sequelize = require("../db/connect");

const getUserLeaderBoard = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["name", "total_exp"],
      order: [["total_exp", "DESC"]],
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
};

module.exports = { getUserLeaderBoard };
