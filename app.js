const express = require("express");
const app = express();
const sequelize = require("./db/connect");
const bodyParser = require("body-parser");
const cors = require('cors')

const userRoutes = require('./routes/users');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(userRoutes);


sequelize.sync().then(() => {
	app.listen(3000);
}
).catch((err) => {
	console.log(err);
});