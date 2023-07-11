const Expenses = require('../model/expenses');
const Users = require('../model/user');

exports.getExpenses = async function (req, res, next) {
    try{
        
      const expenses = await Expenses.findAll({where: {userId: req.user.id}});
      const user = await Users.findOne({where: {id: req.user.id}}) 
      
      return res.status(200).json({expenses,user, success:true})
    } catch(err) {
      console.log(err);
    }
};

exports.postExpenses = async function (req, res, next) {
    try {
       
      const { expense, desc, catg } = req.body
      const expense2 = await Expenses.create({ expense, desc, catg, userId:req.user.id});
      const user = await Users.findOne({ where: { id: req.user.id } });
      const exp = user.total_exp;
      await user.update({ total_exp: exp + expense / 1 });
      return res.status(201).json({expense2,user, success:true});
      
    } catch(err) {
        console.log(err);
    }
};

exports.deleteExpense = async function (req, res, next) {
    try {
        const expenseId = req.params.id;
       
        Expenses.destroy({where: { id: expenseId, userId: req.user.id }}).then((noOfRows) => {
            if(noOfRows === 0) {
                return res.status(404).json({success:false, message:'Expense does not belong to user'});
            }
            return res.status(204).json({success: true, message:"Deleted Successfully"})
        }).catch((err) => {
            console.log(err);
            return res.status(403).json({success: true, message:"Failed"})
        })
    } catch (err) {
        console.log(err);
    }
}