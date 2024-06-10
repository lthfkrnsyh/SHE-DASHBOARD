const saltRounds = 10;
const {
  sendRespon,
  sendResponList,
  sendError,
  meta,
} = require("../../helper/ResponseHelper");
const { param, body, query, validationResult } = require("express-validator");
const GhgService = require("../service/GhgService");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");


const tokenMidelWare = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return sendError(res, "Error", "Token tidak tersedia", 401);
    }

    jwt.verify(token, "rahasia", (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return sendError(res, "Error", "Token sudah kedaluwarsa", 401);
        } else {
          return sendError(res, "Error", "Token tidak valid", 401);
        }
      }
      // If token is valid, proceed to the next middleware or route handler
      next();
    });
  } catch (e) {
    // Catch any synchronous errors and return an error response
    return sendError(res, "Error", "Token tidak tersedia", 401);
  }
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Kesalahan multer
    return res
      .status(400)
      .json({ message: "Kesalahan saat mengunggah file", error: err.message });
  } else if (err) {
    // Kesalahan lainnya
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: err.toString() });
  }
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "public/uploads/accident";
    // Periksa apakah folder sudah ada
    if (!fs.existsSync(uploadPath)) {
      // Jika tidak ada, buat folder
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Menggunakan nama file yang sama untuk di-upload dan disimpan di database
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + path.extname(file.originalname);
    req.fileName = fileName; // Menyimpan nama file ke req untuk digunakan nanti
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return cb({ error: "Token tidak tersedia" });
  }

  jwt.verify(token, "rahasia", (err, decoded) => {
    if (err) {
      return cb({ error: "Token tidak valid atau sudah kedaluwarsa" });
    }
    cb(null, true);
  });
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

class GhgController {
  static test = [
    async (req, res) => {
      res.json({ data: "Ini adalah data test GhgController" });
    },
  ];
  //Ghg
  static deleteGhg = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const id = req.params.id;
        // Attempt to delete the accident record from the database
        const app = await GhgService.deleteItensitasAir(id);
        if (app.code !== 200) {
          return sendRespon(res, app.status, null, app.message, app.code);
        }

        // Send a successful response
        sendRespon(
          res,
          app.status,
          null,
          "Intensitas air deleted successfully",
          app.code
        );
      } catch (error) {
        console.error("Error deleting accident record:", error);
        sendRespon(res, 500, null, "Failed to delete accident record", 500);
      }
    },
  ];
  static getGhgAll = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const apps = await GhgService.getGhgAll(1, 10);
        console.log(`upi log => ${JSON.stringify(apps)}`);
        if (apps.code == 200) {
          sendResponList(
            res,
            apps.status,
            apps.data,
            apps.message,
            apps.meta,
            apps.code
          );
        } else {
          sendRespon(res, apps.status, {}, apps.message, apps.code);
        }
      } catch (error) {
        console.error("Error:", error);
        sendRespon(res, "ERROR", {}, "An error occurred", 500);
      }
    },
  ];

  static insertGhg = [
    tokenMidelWare,
    async (req, res) => {
      const { year, month, Listrik, SolarDieselB30, NaturalGas, SolarDieselB35, BensinPetrol, GRK, EnergyGJ, PenggunaanREC, TotalAkhirGRK, PersentaseReduceGRK, TotalRenewableEnergyGJ, PersentaseRenewableEnergy } =
        req.body;

      const app = await GhgService.insertItensitasAir({
        year: year,
        month: month,
        Listrik: Listrik,
        SolarDieselB30: SolarDieselB30,
        NaturalGas: NaturalGas,
        SolarDieselB35: SolarDieselB35,
        BensinPetrol: BensinPetrol,
        GRK: GRK,
        EnergyGJ: EnergyGJ,
        PenggunaanREC: PenggunaanREC,
        TotalAkhirGRK: TotalAkhirGRK,
        PersentaseReduceGRK: PersentaseReduceGRK,
        TotalAkhirEnergyGJ: TotalAkhirEnergyGJ,
        TotalRenewableEnergyGJ: TotalRenewableEnergyGJ,
        PersentaseRenewableEnergy: PersentaseRenewableEnergy,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static updateGhg = [
    tokenMidelWare,
    async (req, res) => {
      const id = req.params.id;
      const { year, month, Listrik, SolarDieselB30, NaturalGas, SolarDieselB35, BensinPetrol, GRK, EnergyGJ, PenggunaanREC, TotalAkhirGRK, PersentaseReduceGRK, TotalRenewableEnergyGJ, PersentaseRenewableEnergy } =
        req.body;

      const app = await GhgService.updateItensitasAir(id, {
        year: year,
        month: month,
        Listrik: Listrik,
        SolarDieselB30: SolarDieselB30,
        NaturalGas: NaturalGas,
        SolarDieselB35: SolarDieselB35,
        BensinPetrol: BensinPetrol,
        GRK: GRK,
        EnergyGJ: EnergyGJ,
        PenggunaanREC: PenggunaanREC,
        TotalAkhirGRK: TotalAkhirGRK,
        PersentaseReduceGRK: PersentaseReduceGRK,
        TotalAkhirEnergyGJ: TotalAkhirEnergyGJ,
        TotalRenewableEnergyGJ: TotalRenewableEnergyGJ,
        PersentaseRenewableEnergy: PersentaseRenewableEnergy,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static getGhgByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await GhgService.getGhgByTahun(tahun);
        console.log(`upi log => ${JSON.stringify(apps)}`);
        if (apps.code == 200) {
          sendResponList(
            res,
            apps.status,
            apps.data,
            apps.message,
            apps.meta,
            apps.code
          );
        } else {
          sendRespon(res, apps.status, {}, apps.message, apps.code);
        }
      } catch (error) {
        console.error("Error:", error);
        sendRespon(res, "ERROR", {}, "An error occurred", 500);
      }
    },
  ];
}

module.exports = GhgController;
