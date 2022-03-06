require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./services/db.services')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


db.sequelize.sync();
//db.sequelize.sync({force : true});

// sample for express server
app.use("/", (req, res, next) => {
  res.status(200).json({ success: true, data: "Start Here" });
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

// fetch routes
let userRouter = require("./routes/user");
app.use("/", userRouter);

let tweetRouter = require("./routes/tweet");
app.use("/", tweetRouter);

