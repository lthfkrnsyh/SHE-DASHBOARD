const express = require("express");
const routerAccident = express.Router();

const AccidentController = require("../controller/AccidentController");

routerAccident.get("/test", AccidentController.test);

/**
 * accident logic
 */

routerAccident.post("/", AccidentController.insert);
routerAccident.put("/approved/:id", AccidentController.approved);
routerAccident.delete("/:id", AccidentController.delete);

routerAccident.get("/", AccidentController.getAll);
routerAccident.get(
  "/get_chart_report/:tahun",
  AccidentController.getChartReport
);
routerAccident.get("/intensitas_air", AccidentController.getIntensitasAirAll);
routerAccident.get(
  "/intensitas_air/:tahun",
  AccidentController.getIntensitasAirByTahun
);
routerAccident.post("/intensitas_air", AccidentController.insertItensitasAir);
routerAccident.put(
  "/intensitas_air/:id",
  AccidentController.updateItensitasAir
);
routerAccident.delete(
  "/intensitas_air/:id",
  AccidentController.deleteIntensitasAir
);

routerAccident.get("/solidwaste", AccidentController.getSolidWasteAll);
routerAccident.get(
  "/solidwaste/:tahun",
  AccidentController.getSolidWasteByTahun
);
routerAccident.post("/solidwaste", AccidentController.insertSolidWaste);
routerAccident.put(
  "/solidwaste/:id",
  AccidentController.updateSolidWaste
);
routerAccident.delete(
  "/solidwaste/:id",
  AccidentController.deleteSolidWaste
);

routerAccident.get("/report_history", AccidentController.getReportHistoryAll);
routerAccident.get(
  "/report_history/:tahun",
  AccidentController.getReportHistoryByTahun
);
routerAccident.post("/report_history", AccidentController.insertReportHistory);
routerAccident.put(
  "/report_history/:id",
  AccidentController.updateReportHistory
);
routerAccident.delete(
  "/report_history/:id",
  AccidentController.deleteReportHistory
);
routerAccident.get(
  "/chart_jam_hilang/:tahun",
  AccidentController.getChartReportHistoryByTahun
);

//new
routerAccident.get(
  "/chart_rate_kecelakaan/:tahun",
  AccidentController.getChartReportHistoryFreguensiKecelakaanByTahun
);

routerAccident.get(
  "/chart_frequency_rate/:tahun",
  AccidentController.getChartReportHistoryFreguensiRateByTahun
);

routerAccident.get(
  "/chart_severity_rate/:tahun",
  AccidentController.getChartReportHistorySeverityRateByTahun
);

routerAccident.get(
  "/chart_intensitas_air/:tahun",
  AccidentController.getChartIntensitasAirByTahun
);

routerAccident.get("/:id", AccidentController.getById);

module.exports = routerAccident;
