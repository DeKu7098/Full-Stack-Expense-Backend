const Razorpay = require("razorpay");
const Order = require("../model/order");

const purchasepremium = async (req, res, next) => {
  try {
    console.log(process.env.RAZORPAY_KEY_ID)
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
     await req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ message: "Something went wrong", error: err });
  }
};


const updateTransaction = async (req, res, next) => {
  try{
      const { payement_id, order_id } = req.body;
      const order = await Order.findOne({where : {orderid: order_id}});
      await order.update({ paymentid: payement_id, status: 'SUCCESSFUL'});
      await req.user.update({ ispremiumuser: true});
      return res.status(202).json({success: true, message: "Transaction Successful"});
  } catch(err) {
      throw new Error(err);
  }
}

module.exports = { purchasepremium,updateTransaction };
