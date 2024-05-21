const knex = require("knex");
const knexConfig = require("../../config/KnexFile");
const db = knex(knexConfig.development);
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
class AuthRepository {
  static async insert(data) {
    const result = await db("users_login")
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
      const rows = await db("users_login").select();
      if (rows.length > 0) {
        return {
          code: 200,
          message: "users login list Data!",
          status: "SUCCESS",
          data: rows,
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

  static async getRole() {
    try {
      const rows = await db("user_roles").select();
      console.log("🚀 ~ AuthRepository ~ getRole ~ rows:", rows);

      if (rows.length > 0) {
        return {
          code: 200,
          message: "role user list Data!",
          status: "SUCCESS",
          data: rows,
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

  static async getById(id) {
    try {
      const rows = await db("users_login").select().where({ id: id });

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
    const result = await db("users_login")
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
      const rowsAffected = await db("users_login").where("id", id).del();
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

  static async login(email, password) {
    try {
      const rows = await db("users_login").select().where({ email: email });

      if (rows.length >= 1) {
        const hashedPassword = rows[0].password;
        if (bcrypt.compare(password, hashedPassword)) {
          // Buat token JWT
          const token = jwt.sign(
            {
              userId: rows[0].id,
              email: rows[0].email,
              name: rows[0].name,
            },
            "rahasia",
            { expiresIn: "12h" }
          );

          const updatedUserData = {
            token: token,
          };

          await db("users_login")
            .update(updatedUserData)
            .where("id", rows[0].id);

          const row = await db("users_login")
            .select()
            .where({ id: rows[0].id })
            .first();
          return {
            code: 200,
            message: "login success",
            status: "SUCCESS",
            data: row,
          };
        } else {
          return {
            code: 400,
            message: "password not same",
            status: "ERROR",
          };
        }
      } else {
        return {
          code: 400,
          message: "Email tidak terdaftar",
          status: "ERROR",
        };
      }
    } catch (error) {
      console.error("Error deleting level:", error);
      return {
        code: 500,
        message: "Internal server error",
        status: "ERROR",
      };
    }
  }
}

module.exports = AuthRepository;
