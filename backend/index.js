require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const salesRoutes = require("./routes/salesRoutes");
const sendMailRote = require("./routes/sendMail");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/sales", salesRoutes);

app.use("/send-email", sendMailRote);

app.listen(4000);
