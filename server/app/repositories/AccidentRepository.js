const knex = require("knex");
const knexConfig = require("../../config/KnexFile");
const db = knex(knexConfig.development);

class AccidentRepository {
  static async insert(data) {
    const result = await db("report_accident")
      .insert(data)
      .then(() => {
        return {
          code: 201,
          message: "Insert success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async getAll() {
    try {
      const rows = await db("report_accident").select().orderBy("id", "desc");
      if (rows.length > 0) {
        const data = await Promise.all(
          rows.map(async (item) => {
            const user = await db("users_login")
              .select()
              .where({ id: item.user_id })
              .first();

            delete user.token;
            delete user.password;

            delete item.user;
            return {
              ...item,
              user,
            };
          })
        );
        // Send the response outside of the map function
        return {
          code: 200,
          message: "Level list Data!",
          status: "SUCCESS",
          data: data,
        };
      } else {
        // Send the response if rows are empty
        return {
          code: 404,
          message: "Data apps Empty!",
          status: "EMPTY",
        };
      }
    } catch (err) {
      // Send the error response here
      return {
        code: 400,
        message: err.message || "Error fetching apps data",
        status: "ERROR",
      };
    }
  }

  static async getById(id) {
    try {
      const rows = await db("report_accident").select().where({ id: id });

      if (rows.length > 0) {
        return {
          code: 200,
          message: "users login list Data!",
          status: "SUCCESS",
          data: rows[0],
        };
      } else {
        return {
          code: 404,
          message: "Data apps Empty!",
          status: "EMPTY",
        };
      }
    } catch (err) {
      return {
        code: 400,
        message: err.message || "Error fetching apps data",
        status: "ERROR",
      };
    }
  }

  static async update(data) {
    const result = await db("report_accident")
      .update(data)
      .then(() => {
        return {
          code: 200,
          message: "Update success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async delete(id) {
    try {
      const rowsAffected = await db("report_accident").where("id", id).del();
      if (rowsAffected === 0) {
        // Jika tidak ada baris yang terpengaruh, mungkin level dengan UUID tersebut tidak ditemukan
        return {
          code: 404,
          message: "Level not found",
          status: "NOT_FOUND",
        };
      }

      return {
        code: 202,
        message: "Level successfully deleted!",
        status: "SUCCESS",
      };
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getChartReport(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const count = await db("report_accident")
          .count("* as count")
          .whereRaw("MONTH(date_accident) = ? AND YEAR(date_accident) = ?", [
            item,
            tahun,
          ])
          .first();

        data.push(count.count || 0); // Menggunakan nilai default 0 jika count tidak ditemukan
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getIntensitasAirAll() {
    try {
      const rows = await db("report_intensitas_air")
        .select()
        .orderBy("id", "desc");
      if (rows.length > 0) {
        // Send the response outside of the map function
        return {
          code: 200,
          message: "Level list Data!",
          status: "SUCCESS",
          data: rows,
        };
      } else {
        // Send the response if rows are empty
        return {
          code: 404,
          message: "Data apps Empty!",
          status: "EMPTY",
        };
      }
    } catch (err) {
      // Send the error response here
      return {
        code: 400,
        message: err.message || "Error fetching apps data",
        status: "ERROR",
      };
    }
  }

  static async insertItensitasAir(data) {
    const result = await db("report_intensitas_air")
      .insert(data)
      .then(() => {
        return {
          code: 201,
          message: "Insert success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async updateItensitasAir(id, data) {
    const result = await db("report_intensitas_air")
      .update(data)
      .where({ id: id })
      .then(() => {
        return {
          code: 201,
          message: "update success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async deleteItensitasAir(id) {
    try {
      const rowsAffected = await db("report_intensitas_air")
        .where("id", id)
        .del();
      if (rowsAffected === 0) {
        // Jika tidak ada baris yang terpengaruh, mungkin level dengan UUID tersebut tidak ditemukan
        return {
          code: 404,
          message: "Report not found",
          status: "NOT_FOUND",
        };
      }

      return {
        code: 202,
        message: "Level successfully deleted!",
        status: "SUCCESS",
      };
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getIntensitasAirByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const rows = await db("report_intensitas_air")
          .select()
          .whereRaw("MONTH(date) = ? AND YEAR(date) = ?", [item, tahun]);

        data.push({ mount: item, year: tahun, data: rows }); // Menggunakan nilai default 0 jika count tidak ditemukan
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  //Solid Waste
  static async getSolidWasteAll() {
    try {
      const rows = await db("report_solid_waste")
        .select()
        .orderBy("id", "desc");
      if (rows.length > 0) {
        // Send the response outside of the map function
        return {
          code: 200,
          message: "Level list Data!",
          status: "SUCCESS",
          data: rows,
        };
      } else {
        // Send the response if rows are empty
        return {
          code: 404,
          message: "Data apps Empty!",
          status: "EMPTY",
        };
      }
    } catch (err) {
      // Send the error response here
      return {
        code: 400,
        message: err.message || "Error fetching apps data",
        status: "ERROR",
      };
    }
  }

  static async insertSolidWaste(data) {
    const result = await db("report_solid_waste")
      .insert(data)
      .then(() => {
        return {
          code: 201,
          message: "Insert success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async updateSolidWaste(id, data) {
    const result = await db("report_solid_waste")
      .update(data)
      .where({ id: id })
      .then(() => {
        return {
          code: 201,
          message: "update success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async deleteSolidWaste(id) {
    try {
      const rowsAffected = await db("report_solid_waste")
        .where("id", id)
        .del();
      if (rowsAffected === 0) {
        // Jika tidak ada baris yang terpengaruh, mungkin level dengan UUID tersebut tidak ditemukan
        return {
          code: 404,
          message: "Report not found",
          status: "NOT_FOUND",
        };
      }

      return {
        code: 202,
        message: "Level successfully deleted!",
        status: "SUCCESS",
      };
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getSolidWasteByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const rows = await db("report_solid_waste")
          .select()
          .whereRaw("MONTH(date) = ? AND YEAR(date) = ?", [item, tahun]);

        data.push({ mount: item, year: tahun, data: rows }); // Menggunakan nilai default 0 jika count tidak ditemukan
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  //Report History

  static async getReportHistoryAll() {
    try {
      const rows = await db("report_history").select().orderBy("id", "desc");
      if (rows.length > 0) {
        // Send the response outside of the map function
        return {
          code: 200,
          message: "Level list Data!",
          status: "SUCCESS",
          data: rows,
        };
      } else {
        // Send the response if rows are empty
        return {
          code: 404,
          message: "Data apps Empty!",
          status: "EMPTY",
        };
      }
    } catch (err) {
      // Send the error response here
      return {
        code: 400,
        message: err.message || "Error fetching apps data",
        status: "ERROR",
      };
    }
  }

  static async insertReportHistory(data) {
    const result = await db("report_history")
      .insert(data)
      .then(() => {
        return {
          code: 201,
          message: "Insert success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async updateReportHistory(id, data) {
    const result = await db("report_history")
      .update(data)
      .where({ id: id })
      .then(() => {
        return {
          code: 201,
          message: "update success",
          status: "SUCCES",
        };
      })
      .catch((err) => {
        const error = err.message.split("-");
        return {
          code: 400,
          message: error[error.length - 1] || "Error fetching apps data",
          status: "ERROR",
        };
      });
    return result;
  }

  static async deleteReportHistory(id) {
    try {
      const rowsAffected = await db("report_history").where("id", id).del();
      if (rowsAffected === 0) {
        // Jika tidak ada baris yang terpengaruh, mungkin level dengan UUID tersebut tidak ditemukan
        return {
          code: 404,
          message: "Report not found",
          status: "NOT_FOUND",
        };
      }

      return {
        code: 202,
        message: "Level successfully deleted!",
        status: "SUCCESS",
      };
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getReportHistoryByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const rows = await db("report_history")
          .select()
          .whereRaw("MONTH(data_input) = ? AND YEAR(data_input) = ?", [
            item,
            tahun,
          ]);

        data.push({ mount: item, year: tahun, data: rows }); // Menggunakan nilai default 0 jika count tidak ditemukan
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async approved(id, data) {
    try {
      return await db("report_accident")
        .where({ id: id }) // Filter berdasarkan id
        .update(data)
        .then((u) => {
          console.log("🚀 ~ AccidentRepository ~ .then ~ u:", u);
          return {
            code: 200,
            message: "Data berhasil diupdate",
            status: "SUCCESS",
          };
        })
        .catch((e) => {
          console.log("🚀 ~ AccidentRepository ~ approved ~ e:", e);
          return {
            code: 404,
            message: "Data dengan ID yang diberikan tidak ditemukan",
            status: "ERROR",
          };
        });
      // await db("report_accident").update(data).where("id", rows[0].id);
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getChartReportHistoryByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const count = await db("report_history")
          .whereRaw("MONTH(data_input) = ? AND YEAR(data_input) = ?", [
            item,
            tahun,
          ])
          .select();
        if (count.length > 0) {
          let total = 0;
          count.forEach((item) => {
            total += item.mh_worked_hilang;
          });
          data.push(total);
        } else {
          data.push(0);
        }
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getChartReportHistoryFreguensiKecelakaanByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const count = await db("report_history")
          .whereRaw("MONTH(data_input) = ? AND YEAR(data_input) = ?", [
            item,
            tahun,
          ])
          .select();
        if (count.length > 0) {
          let total = 0;
          count.forEach((item) => {
            total += item.frequncy_kecelakaan;
          });
          data.push(total);
        } else {
          data.push(0);
        }
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }

  static async getChartReportHistoryFreguensiRateByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const count = await db("report_history")
          .whereRaw("MONTH(data_input) = ? AND YEAR(data_input) = ?", [
            item,
            tahun,
          ])
          .select();
        if (count.length > 0) {
          let total = 0;
          count.forEach((item) => {
            total += item.frequency_rate;
          });
          data.push(total);
        } else {
          data.push(0);
        }
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }
  static async getChartReportHistorySeverityRateByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data = [];

      for (const item of labels) {
        const count = await db("report_history")
          .whereRaw("MONTH(data_input) = ? AND YEAR(data_input) = ?", [
            item,
            tahun,
          ])
          .select();
        if (count.length > 0) {
          let total = 0;
          count.forEach((item) => {
            total += item.severity_rate;
          });
          data.push(total);
        } else {
          data.push(0);
        }
      }

      console.log("🚀 ~ AccidentRepository ~ count:", data);
      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: data,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }
  static async getChartIntensitasAirByTahun(tahun) {
    try {
      const labels = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let data_total = [];
      let data_product_finish_good = [];
      let data_air_permukaan = [];
      let data_air_tanah = [];
      let data_air_pam = [];

      for (const item of labels) {
        const count = await db("report_intensitas_air")
          .whereRaw("MONTH(date) = ? AND YEAR(date) = ?", [item, tahun])
          .select();
        if (count.length > 0) {
          let product_finish_good = 0;
          let air_permukaan = 0;
          let air_tanah = 0;
          let air_pam = 0;
          count.forEach((item) => {
            product_finish_good += item.product_finish_good;
            air_permukaan += item.air_permukaan;
            air_tanah += item.air_tanah;
            air_pam += item.air_pam;
          });
          data_product_finish_good.push(product_finish_good);
          data_air_permukaan.push(air_permukaan);
          data_air_tanah.push(air_tanah);
          data_air_pam.push(air_pam);
          data_total.push(
            product_finish_good + air_permukaan + air_tanah + air_pam
          );
        } else {
          data_product_finish_good.push(0);
          data_air_permukaan.push(0);
          data_air_tanah.push(0);
          data_air_pam.push(0);
          data_total.push(0);
        }
      }

      return {
        code: 200,
        message: "Data list",
        status: "SUCCESS",
        data: {
          data_product_finish_good,
          data_air_permukaan,
          data_air_tanah,
          data_air_pam,
          data_total,
        },
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }
}

module.exports = AccidentRepository;
