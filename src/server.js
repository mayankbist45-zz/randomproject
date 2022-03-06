require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./services/db.services");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

db.sequelize.sync();
//db.sequelize.sync({force : true});

const PORT = process.env.PORT || 8081; 
//start the server
app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

// fetch routes
let userRouter = require("./routes/user");
app.use("/users", userRouter);

let authRouter = require("./routes/auth");
app.use("/login", authRouter);

let tweetRouter = require("./routes/tweet");
app.use("/tweets", tweetRouter);
