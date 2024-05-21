const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

const auth = require("./app/routes/AuthRoute");
const accident = require("./app/routes/AccidentRoute");

app.use(express.static("public"));
app.use(express.json());

app.use("/auth", auth);
app.use("/accident", accident);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
