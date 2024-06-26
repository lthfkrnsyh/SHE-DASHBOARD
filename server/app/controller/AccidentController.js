const saltRounds = 10;
const {
  sendRespon,
  sendResponList,
  sendError,
  meta,
} = require("../../helper/ResponseHelper");
const { param, body, query, validationResult } = require("express-validator");
const AccidentService = require("../service/AccidentService");
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

class AccidentController {
  static test = [
    async (req, res) => {
      res.json({ data: "ini adalah data test AccidentController" });
    },
  ];

  static getAll = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const apps = await AccidentService.getAll(1, 10);
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

  static getById = [
    async (req, res) => {
      const id = req.params.id;

      const app = await AccidentService.getById(id);

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 200) {
        delete app.data.password;
        sendRespon(res, app.status, app.data, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];

  static insert = [
    body("user_id").trim().notEmpty().withMessage("user is required"),
    body("date_accident")
      .trim()
      .notEmpty()
      .withMessage("date accident by is required"),
    body("time_accident")
      .trim()
      .notEmpty()
      .withMessage("time accident is required"),
    body("location").trim().notEmpty().withMessage("location is required"),
    body("department").trim().notEmpty().withMessage("department is required"),
    body("informasi").trim().notEmpty().withMessage("informasi is required"),
    body("kronologi").trim().notEmpty().withMessage("kronologi is required"),
    body("first_aid").trim().notEmpty().withMessage("first aid is required"),
    body("event_category")
      .trim()
      .notEmpty()
      .withMessage("event category is required"),
    errorHandler,
    tokenMidelWare,
    upload.fields([
      { name: "image_accident", maxCount: 1 },
      { name: "image_first_aid", maxCount: 1 },
    ]),
    async (req, res) => {
      const {
        user_id,
        date_accident,
        time_accident,
        location,
        department,
        informasi,
        kronologi,
        first_aid,
        event_category,
      } = req.body;

      const fileNames = {
        image_accident: req.files["image_accident"][0].filename,
        image_first_aid: req.files["image_first_aid"][0].filename,
      };

      const app = await AccidentService.insert({
        user_id: user_id,
        date_accident: date_accident,
        time_accident: time_accident,
        location: location,
        department: department,
        informasi: informasi,
        kronologi: kronologi,
        first_aid: first_aid,
        event_category: event_category,
        image_accident: fileNames.image_accident,
        image_first_aid: fileNames.image_first_aid,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        deleteFile(`public/uploads/accident/${fileNames.image_first_aid}`);
        deleteFile(`public/uploads/accident/${fileNames.image_accident}`);
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];

  static approved = [
    body("user_id").trim().notEmpty().withMessage("user is required"),
    async (req, res) => {
      const id = req.params.id;
      const { user_id } = req.body;
      let date_now = new Date();

      const app = await AccidentService.approved(id, {
        approved: true,
        approved_by: user_id,
        approved_date: date_now,
      });

      if (app.code == 200) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];

  static delete = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const id = req.params.id;
        // Attempt to delete the accident record from the database
        const app = await AccidentService.delete(id);
        if (app.code !== 200) {
          return sendRespon(res, app.status, null, app.message, app.code);
        }

        // Send a successful response
        sendRespon(
          res,
          app.status,
          null,
          "Accident record and images deleted successfully",
          app.code
        );
      } catch (error) {
        console.error("Error deleting accident record:", error);
        sendRespon(res, 500, null, "Failed to delete accident record", 500);
      }
    },
  ];

  static getChartReport = [
    tokenMidelWare,
    async (req, res) => {
      const tahun = req.params.tahun;
      try {
        // Attempt to delete the accident record from the database
        const app = await AccidentService.getChartReport(tahun);

        if (app.code !== 200) {
          return sendRespon(res, app.status, null, app.message, app.code);
        }

        sendRespon(
          res,
          app.status,
          app.data,
          "Accident record and images deleted successfully",
          app.code
        );
      } catch (error) {
        console.error("Error deleting accident record:", error);
        sendRespon(res, 500, null, "Failed to delete accident record", 500);
      }
    },
  ];

  //IntensitasAir
  static deleteIntensitasAir = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const id = req.params.id;
        // Attempt to delete the accident record from the database
        const app = await AccidentService.deleteItensitasAir(id);
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
  static getIntensitasAirAll = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const apps = await AccidentService.getIntensitasAirAll(1, 10);
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

  static insertItensitasAir = [
    tokenMidelWare,
    async (req, res) => {
      const { product_finish_good, air_permukaan, air_tanah, air_pam, date } =
        req.body;

      const app = await AccidentService.insertItensitasAir({
        product_finish_good: product_finish_good,
        air_permukaan: air_permukaan,
        air_tanah: air_tanah,
        air_pam: air_pam,
        date: date,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static updateItensitasAir = [
    tokenMidelWare,
    async (req, res) => {
      const id = req.params.id;
      const { product_finish_good, air_permukaan, air_tanah, air_pam, date } =
        req.body;

      const app = await AccidentService.updateItensitasAir(id, {
        product_finish_good: product_finish_good,
        air_permukaan: air_permukaan,
        air_tanah: air_tanah,
        air_pam: air_pam,
        date: date,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static getIntensitasAirByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await AccidentService.getIntensitasAirByTahun(tahun);
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


  //Solid Waste
  static deleteSolidWaste = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const id = req.params.id;
        // Attempt to delete the accident record from the database
        const app = await AccidentService.deleteSolidWaste(id);
        if (app.code !== 200) {
          return sendRespon(res, app.status, null, app.message, app.code);
        }

        // Send a successful response
        sendRespon(
          res,
          app.status,
          null,
          "Solid Waste air deleted successfully",
          app.code
        );
      } catch (error) {
        console.error("Error deleting Solid Waste:", error);
        sendRespon(res, 500, null, "Failed to delete Solid Waste", 500);
      }
    },
  ];
  static getSolidWasteAll = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const apps = await AccidentService.getSolidWasteAll(1, 10);
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

  static insertSolidWaste = [
    tokenMidelWare,
    async (req, res) => {
      const { limbah_plastik_non_b3_disposed, limbah_domestik_non_plastik_non_b3_disposed, limbah_industri_non_plastik_non_b3_disposed, 
        limbah_b3_disposed, total_limbah_padat_disposed, limbah_plastik_non_b3_diverted, limbah_domestik_non_plastik_non_b3_diverted, 
        limbah_industri_non_plastik_non_b3_diverted, limbah_b3_diverted, total_limbah_padat_diverted, total_limbah_padat, percentage_diverted, date } =
        req.body;

      const app = await AccidentService.insertSolidWaste({
        limbah_plastik_non_b3_disposed: limbah_plastik_non_b3_disposed,
        limbah_domestik_non_plastik_non_b3_disposed: limbah_domestik_non_plastik_non_b3_disposed,
        limbah_industri_non_plastik_non_b3_disposed: limbah_industri_non_plastik_non_b3_disposed,
        limbah_b3_disposed: limbah_b3_disposed,
        total_limbah_padat_disposed: total_limbah_padat_disposed,
        limbah_plastik_non_b3_diverted: limbah_plastik_non_b3_diverted,
        limbah_domestik_non_plastik_non_b3_diverted: limbah_domestik_non_plastik_non_b3_diverted,
        limbah_industri_non_plastik_non_b3_diverted: limbah_industri_non_plastik_non_b3_diverted,
        limbah_b3_diverted: limbah_b3_diverted,
        total_limbah_padat_diverted: total_limbah_padat_diverted,
        total_limbah_padat: total_limbah_padat,
        percentage_diverted: percentage_diverted,
        date: date,
        date_create: date_create,
        date_update: date_update,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static updateSolidWaste = [
    tokenMidelWare,
    async (req, res) => {
      const id = req.params.id;
      const { limbah_plastik_non_b3_disposed, limbah_domestik_non_plastik_non_b3_disposed, limbah_industri_non_plastik_non_b3_disposed, 
        limbah_b3_disposed, total_limbah_padat_disposed, limbah_plastik_non_b3_diverted, limbah_domestik_non_plastik_non_b3_diverted, 
        limbah_industri_non_plastik_non_b3_diverted, limbah_b3_diverted, total_limbah_padat_diverted, total_limbah_padat, percentage_diverted, date } =
        req.body;

      const app = await AccidentService.updateSolidWaste(id, {
        limbah_plastik_non_b3_disposed: limbah_plastik_non_b3_disposed,
        limbah_domestik_non_plastik_non_b3_disposed: limbah_domestik_non_plastik_non_b3_disposed,
        limbah_industri_non_plastik_non_b3_disposed: limbah_industri_non_plastik_non_b3_disposed,
        limbah_b3_disposed: limbah_b3_disposed,
        total_limbah_padat_disposed: total_limbah_padat_disposed,
        limbah_plastik_non_b3_diverted: limbah_plastik_non_b3_diverted,
        limbah_domestik_non_plastik_non_b3_diverted: limbah_domestik_non_plastik_non_b3_diverted,
        limbah_industri_non_plastik_non_b3_diverted: limbah_industri_non_plastik_non_b3_diverted,
        limbah_b3_diverted: limbah_b3_diverted,
        total_limbah_padat_diverted: total_limbah_padat_diverted,
        total_limbah_padat: total_limbah_padat,
        percentage_diverted: percentage_diverted,
        date: date,
        date_create: date_create,
        date_update: date_update,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static getSolidWasteByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await AccidentService.getSolidWasteByTahun(tahun);
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
    
  //ReportHistory
  static deleteReportHistory = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const id = req.params.id;
        // Attempt to delete the accident record from the database
        const app = await AccidentService.deleteReportHistory(id);
        if (app.code !== 200) {
          return sendRespon(res, app.status, null, app.message, app.code);
        }

        // Send a successful response
        sendRespon(
          res,
          app.status,
          null,
          "Accident record and images deleted successfully",
          app.code
        );
      } catch (error) {
        console.error("Error deleting accident record:", error);
        sendRespon(res, 500, null, "Failed to delete accident record", 500);
      }
    },
  ];
  static getReportHistoryAll = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const apps = await AccidentService.getReportHistoryAll(1, 10);
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

  static insertReportHistory = [
    tokenMidelWare,
    async (req, res) => {
      const {
        frequncy_kecelakaan,
        mh_worked_hilang,
        mh_worked_tersedia,
        hari_kerja_hilang,
        hari_kerja_tersedia,
        jumlah_karyawan,
        persen_mh_worked_hilang,
        frequency_rate,
        severity_rate,
        cost_kecelakaa_kerja,
        kec_tampa_hari_hilang,
        kec_dg_hari_hilang,
        data_input,
      } = req.body;

      const app = await AccidentService.insertReportHistory({
        frequncy_kecelakaan,
        mh_worked_hilang,
        mh_worked_tersedia,
        hari_kerja_hilang,
        hari_kerja_tersedia,
        jumlah_karyawan,
        persen_mh_worked_hilang,
        frequency_rate,
        severity_rate,
        cost_kecelakaa_kerja,
        kec_tampa_hari_hilang,
        kec_dg_hari_hilang,
        data_input,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static updateReportHistory = [
    tokenMidelWare,
    async (req, res) => {
      const id = req.params.id;
      const {
        frequncy_kecelakaan,
        mh_worked_hilang,
        mh_worked_tersedia,
        hari_kerja_hilang,
        jumlah_karyawan,
        persen_mh_worked_hilang,
        frequency_rate,
        severity_rate,
        cost_kecelakaa_kerja,
        kec_tampa_hari_hilang,
        kec_dg_hari_hilang,
        data_input,
      } = req.body;

      const app = await AccidentService.updateReportHistory(id, {
        frequncy_kecelakaan,
        mh_worked_hilang,
        mh_worked_tersedia,
        hari_kerja_hilang,
        jumlah_karyawan,
        persen_mh_worked_hilang,
        frequency_rate,
        severity_rate,
        cost_kecelakaa_kerja,
        kec_tampa_hari_hilang,
        kec_dg_hari_hilang,
        data_input,
      });

      console.log(`upi log => ${JSON.stringify(app)}`);
      if (app.code == 201) {
        sendRespon(res, app.status, null, app.message, app.code);
      } else {
        sendRespon(res, app.status, null, app.message, app.code);
      }
    },
  ];
  static getReportHistoryByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await AccidentService.getReportHistoryByTahun(tahun);
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

  static getChartReportHistoryByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await AccidentService.getChartReportHistoryByTahun(tahun);
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

  //new
  static getChartReportHistoryFreguensiKecelakaanByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps =
          await AccidentService.getChartReportHistoryFreguensiKecelakaanByTahun(
            tahun
          );
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
  static getChartReportHistoryFreguensiRateByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps =
          await AccidentService.getChartReportHistoryFreguensiRateByTahun(
            tahun
          );
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

  static getChartReportHistorySeverityRateByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps =
          await AccidentService.getChartReportHistorySeverityRateByTahun(tahun);
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
  static getChartIntensitasAirByTahun = [
    tokenMidelWare,
    async (req, res) => {
      try {
        const tahun = req.params.tahun;
        const apps = await AccidentService.getChartIntensitasAirByTahun(tahun);
        console.log(`ringga log => ${JSON.stringify(apps)}`);
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

function deleteFile(filePath) {
  console.log("File  " + filePath);
  // Menggunakan fungsi fs.unlink untuk menghapus file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Gagal menghapus file:", err);
      return;
    }
    console.log("File berhasil dihapus " + filePath);
  });
}

module.exports = AccidentController;
