const express = require("express");
const routerGhg = express.Router();

const GhgController = require("../controller/GhgController");

routerGhg.get("/ghg-test", GhgController.test);

/**
 * accident logic
 */

routerGhg.get("/ghg", GhgController.getGhgAll);
routerGhg.get(
  "/ghg/:tahun",
  GhgController.getGhgByTahun
);
routerGhg.post("/ghg", GhgController.insertGhg);
routerGhg.put(
  "/ghg/:id",
  GhgController.updateGhg
);
routerGhg.delete(
  "/ghg/:id",
  GhgController.deleteGhg
);


module.exports = routerGhg;
