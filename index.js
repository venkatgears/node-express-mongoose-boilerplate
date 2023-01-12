const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRoute = require("./routes/authRoute");
const dbCon = require("./config/dbConnect");
const bodyParser = require("body-parser");
const { notfound } = require("./middleware/errorHandler");
const { errorHandler } = require("./middleware/errorHandler");

app = express();
dbCon();
app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));

app.use((req, res) => {
  console.log(`request made ${req.url} : ${req.method}`);
  req.next();
});

app.use("/api/user", authRoute);

app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
