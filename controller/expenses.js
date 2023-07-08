const Expenses = require('../model/expenses');
const sequelize = require('../db/connect');

exports.getExpenses = async function (req, res, next) {
    try{
        Expenses.findAll().then(expenses => {
            return res.status(200).json({expenses, success:true})
        })
    } catch(err) {
      console.log(err);
    }
};

exports.postExpenses = async function (req, res, next) {
    try {
      const { expense, desc, catg} = req.body
      Expenses.create({ expense, desc, catg}).then(expense => {
        return res.status(201).json({expense, success:true});
      });
    } catch(err) {
        console.log(err);
    }
};

exports.deleteExpense = async function (req, res, next) {
    try {
        const id = req.params.id;
        console.log(id,'hi')
        await Expenses.destroy({where: {id : id}});
    } catch (err) {
        console.log(err);
    }
}