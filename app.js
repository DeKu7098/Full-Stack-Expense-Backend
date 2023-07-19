const express = require("express");
const path = require('path');
const app = express();
require('dotenv').config();
const sequelize = require("./db/connect");
const bodyParser = require("body-parser");
const cors = require('cors');

const User = require('./model/user');
const Expenses = require('./model/expenses');
const Order = require('./model/order');
const Password = require('./model/password');
const Reports = require('./model/generatedReports'); 

const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premiumFeature');
const passwordRoutes = require('./routes/forgetPass');


app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"/"+req.url))
})
 


User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Password);
Password.belongsTo(User);

User.hasMany(Reports);
Reports.belongsTo(User);


sequelize.sync().then(() => {
	app.listen(process.env.PORT || 3000);
}
).catch((err) => {
	console.log(err);
});