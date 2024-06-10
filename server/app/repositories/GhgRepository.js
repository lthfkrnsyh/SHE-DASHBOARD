const knex = require("knex");
const knexConfig = require("../../config/KnexFile");
const db = knex(knexConfig.development);

class GhgRepository {
  static async getGhgAll() {
    try {
      const rows = await db("energydata")
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

  static async insertGhg(data) {
    const result = await db("energydata")
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

  static async updateGhg(id, data) {
    const result = await db("energydata")
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

  static async deleteGhg(id) {
    try {
      const rowsAffected = await db("energydata")
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

  static async getGhgByTahun(tahun) {
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
        const rows = await db("energydata")
          .select()
          .whereRaw("MONTH(date) = ? AND YEAR(date) = ?", [item, tahun]);

        data.push({ mount: item, year: tahun, data: rows }); // Menggunakan nilai default 0 jika count tidak ditemukan
      }

      console.log("🚀 ~ GhgRepository ~ count:", data);
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
}

module.exports = GhgRepository;
