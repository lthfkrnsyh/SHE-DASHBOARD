const GhgRepository = require("../repositories/GhgRepository");

class GhgService {
  // service air
  static async getGhgAll() {
    return await GhgRepository.getGhgAll();
  }
  static async insertGhg(data) {
    return await GhgRepository.insertGhg(data);
  }
  static async updateGhg(id, data) {
    return await GhgRepository.updateGhg(id, data);
  }
  static async deleteGhg(id) {
    return await GhgRepository.deleteGhg(id);
  }
  static async getGhgByTahun(tahun) {
    return await GhgRepository.getGhgByTahun(tahun);
  }
}

module.exports = GhgService;
