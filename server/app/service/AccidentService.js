const AccidentRepository = require("../repositories/AccidentRepository");

class AccidentService {
  static async insert(data) {
    return await AccidentRepository.insert(data);
  }

  static async getAll() {
    return await AccidentRepository.getAll();
  }

  static async getById(id) {
    return await AccidentRepository.getById(id);
  }

  static async update(id, data) {
    return await AccidentRepository.update(id, data);
  }

  static async delete(id) {
    return await AccidentRepository.delete(id);
  }

  static async getChartReport(tahun) {
    return await AccidentRepository.getChartReport(tahun);
  }

  static async approved(id, data) {
    return await AccidentRepository.approved(id, data);
  }

  // service air
  static async getIntensitasAirAll() {
    return await AccidentRepository.getIntensitasAirAll();
  }
  static async insertItensitasAir(data) {
    return await AccidentRepository.insertItensitasAir(data);
  }
  static async updateItensitasAir(id, data) {
    return await AccidentRepository.updateItensitasAir(id, data);
  }
  static async deleteItensitasAir(id) {
    return await AccidentRepository.deleteItensitasAir(id);
  }
  static async getIntensitasAirByTahun(tahun) {
    return await AccidentRepository.getIntensitasAirByTahun(tahun);
  }

   // Solid Waste
   static async getSolidWasteAll() {
    return await AccidentRepository.getSolidWasteAll();
  }
  static async insertSolidWaste(data) {
    return await AccidentRepository.insertSolidWaste(data);
  }
  static async updateSolidWaste(id, data) {
    return await AccidentRepository.updateSolidWaste(id, data);
  }
  static async deleteSolidWaste(id) {
    return await AccidentRepository.deleteSolidWaste(id);
  }
  static async getSolidWasteByTahun(tahun) {
    return await AccidentRepository.getSolidWasteByTahun(tahun);
  }

  //GHG
     // Solid Waste
     static async getGhgAll() {
      return await AccidentRepository.getGhgAll();
    }
    static async insertGhg(data) {
      return await AccidentRepository.insertGhg(data);
    }
    static async updateGhg(id, data) {
      return await AccidentRepository.updateGhg(id, data);
    }
    static async deleteGhg(id) {
      return await AccidentRepository.deleteGhg(id);
    }
    static async getGhgByTahun(tahun) {
      return await AccidentRepository.getGhgByTahun(tahun);
    }

  // ReportHistory
  static async getReportHistoryAll() {
    return await AccidentRepository.getReportHistoryAll();
  }
  static async insertReportHistory(data) {
    return await AccidentRepository.insertReportHistory(data);
  }
  static async updateReportHistory(id, data) {
    return await AccidentRepository.updateReportHistory(id, data);
  }
  static async deleteReportHistory(id) {
    return await AccidentRepository.deleteReportHistory(id);
  }
  static async getReportHistoryByTahun(tahun) {
    return await AccidentRepository.getReportHistoryByTahun(tahun);
  }

  static async getChartReportHistoryByTahun(tahun) {
    return await AccidentRepository.getChartReportHistoryByTahun(tahun);
  }

  //new
  static async getChartReportHistoryFreguensiKecelakaanByTahun(tahun) {
    return await AccidentRepository.getChartReportHistoryFreguensiKecelakaanByTahun(
      tahun
    );
  }
  static async getChartReportHistoryFreguensiRateByTahun(tahun) {
    return await AccidentRepository.getChartReportHistoryFreguensiRateByTahun(
      tahun
    );
  }
  static async getChartReportHistorySeverityRateByTahun(tahun) {
    return await AccidentRepository.getChartReportHistorySeverityRateByTahun(
      tahun
    );
  }

  static async getChartIntensitasAirByTahun(tahun) {
    return await AccidentRepository.getChartIntensitasAirByTahun(tahun);
  }

}

module.exports = AccidentService;
