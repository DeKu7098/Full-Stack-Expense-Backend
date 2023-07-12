const Expenses = require("../model/expenses");
const Users = require("../model/user");
const sequelize = require("../db/connect.js");

exports.getExpenses = async function (req, res, next) {
  try {
    var page = req.params.page;
    page = page / 1;
    var limit = req.params.limit || 5;
    limit = limit / 1;
    const noofExp = await Expenses.count({where: {userId: req.user.id}});
    const expenses = await Expenses.findAll({
      where: { userId: req.user.id },
      offset: (page - 1) * limit,
      limit: limit,
      order: [["id", "DESC"]],
    });
    const user = await Users.findOne({ where: { id: req.user.id } });

    return res.status(200).json({
      expenses,
      user,
      success: true,
      pagination: {
        lastpage: Math.ceil(noofExp / limit),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postExpenses = async function (req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { expense, desc, catg } = req.body;
    await Expenses.create(
      { expense, desc, catg, userId: req.user.id },
      { transaction: t }
    );
    const user = await Users.findOne({ where: { id: req.user.id } });
    const exp = user.total_exp;
    await user.update({ total_exp: exp + expense / 1 }, { transaction: t });
    await t.commit();
    return res.status(201).json({ success: true });
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

exports.deleteExpense = async function (req, res, next) {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.id;
    var amount = 0;
    const deletedExpense = await Expenses.findOne({ where: { id: expenseId } });
    amount = deletedExpense.expense;
    await deletedExpense.destroy({ transaction: t });
    const user = await Users.findOne({ where: { id: req.user.id } });
    const exp = user.total_exp;
    await user.update({ total_exp: exp - amount / 1 }, { transaction: t });
    await t.commit();
    res.status(200).json({ message: "deleted" });
  } catch {
    await t.rollback();
    res.status(500).json({ message: "Some thing went wrong " });
  }
};
