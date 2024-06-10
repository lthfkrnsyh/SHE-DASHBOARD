const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

const auth = require("./app/routes/AuthRoute");
const accident = require("./app/routes/AccidentRoute");
const ghg = require("./app/routes/GhgRoute");

app.use(express.static("public"));
app.use(express.json());

app.use("/auth", auth);
app.use("/accident", accident);
app.use("/ghg", ghg);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
