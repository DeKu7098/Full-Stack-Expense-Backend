const Expenses = require('../model/expenses');

exports.getExpenses = async function (req, res, next) {
    try{
        // console.log('userId>>>>>>',req.user.id);
      Expenses.findAll({where: {userId: req.user.id}}).then(expenses => {
        //    console.log(expenses);
        return res.status(200).json({expenses, success:true})
        })
    } catch(err) {
      console.log(err);
    }
};

exports.postExpenses = async function (req, res, next) {
    try {
        // console.log('id>>>>>',req.user.id)
      const { expense, desc, catg } = req.body
     const expense2 = await Expenses.create({ expense, desc, catg, userId:req.user.id})
        return res.status(201).json({expense2, success:true});
      
    } catch(err) {
        console.log(err);
    }
};

exports.deleteExpense = async function (req, res, next) {
    try {
        const expenseId = req.params.id;
        console.log(expenseId)
        // console.log(id,'hi')
        // await Expenses.destroy({where: {id : id}});
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