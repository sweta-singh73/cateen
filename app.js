const express = require("express");
const app = express();

const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute")

//uses
app.use(express.json());

app.use("/v1/admin", adminRouter);
app.use("/v1/user", userRouter);

module.exports = app;
