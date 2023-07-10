const express = require("express");
const app = express();
require('dotenv').config();
const sequelize = require("./db/connect");
const bodyParser = require("body-parser");
const cors = require('cors')

const User = require('./model/user');
const Expenses = require('./model/expenses');
const Order = require('./model/order');

const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const purchaseRoutes = require('./routes/purchase');


app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);

User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize.sync().then(() => {
	app.listen(3000);
}
).catch((err) => {
	console.log(err);
});