import axios from "axios";
export class AccidentRepository {
  async getListAllApi(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/accident", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ getListAllAccidentApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getChartReport(token: string, tahun: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/get_chart_report/" + tahun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getChartReportApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getChartJamKerjaHilang(token: string, tahun: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/chart_jam_hilang/" + tahun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getChartJamKerjaHilangApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async sentReport(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ sentReportApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to sent report");
    }
  }

  async insertUser(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post("http://localhost:4000/auth", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert");
    }
  }

  async updateUser(token: string, id: string, data: FormData): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/auth/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateUser ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async getUserList(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ getUserListApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async deleteReport(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `http://localhost:4000/accident/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

  async approvedReport(
    token: string,
    id: string,
    user_id: string
  ): Promise<any> {
    try {
      const response = await axios.put(
        `http://localhost:4000/accident/approved/${id}`,
        { user_id: user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ approvedReportApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to Approved Report");
    }
  }

  async getRoles(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/auth/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ getRolesApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  //Intensitas Air
  async getListIntensitasAirAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/intensitas_air",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getListApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertIntensitasAir(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident/intensitas_air",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert");
    }
  }

  async updateIntensitasAir(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/accident/intensitas_air/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async deleteIntensitasAir(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/accident/intensitas_air/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

  //Solid Waste
  async getListSolidWasteAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/solidwaste",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getListApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertSolidWaste(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident/solidwaste",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert");
    }
  }

  async updateSolidWaste(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/accident/solidwaste/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async deleteSolidWaste(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/accident/solidwaste/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

  //GHG
  async getListGhgAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/ghg",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getListApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertGhg(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident/ghg",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure this header is set for FormData
          },
        }
      );
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert GHG data");
    }
  }
  

  async updateGhg(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/accident/ghg/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async deleteGhg(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/accident/ghg/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

    //Tabel Konversi 2024
    async getListTabelKonversi2024All(token: string): Promise<any> {
      try {
        const response = await axios.get(
          "http://localhost:4000/accident/tabelkonversi2024",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("🚀 ~ getListTabelKonversi2024All ~ response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch 2024 data:", error);
        return [];
      }
    }
  
    async insertTabelKonversi2024(token: string, data: FormData): Promise<any> {
      try {
        const response = await axios.post(
          "http://localhost:4000/accident/tabelkonversi2024",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("🚀 ~ insertTabelKonversi2024 ~ response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Failed to insert 2024 data:", error);
        throw new Error("Failed to insert 2024 data");
      }
    }
  
    async updateTabelKonversi2024(
      token: string,
      id: string,
      data: FormData
    ): Promise<any> {
      try {
        const response = await axios.put(
          "http://localhost:4000/accident/tabelkonversi2024/" + id,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("🚀 ~ Update 2024 data ~ response:", response.data);
        return response.data;
      } catch (error) {
        // Handle errors
        throw new Error("Failed to update 2024 data");
      }
    }
  
    async deleteTabelKonversi2024(token: string, id: string): Promise<any> {
      try {
        const response = await axios.delete(
          "http://localhost:4000/accident/tabelkonversi2024/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("🚀 ~ deleteApi ~ response:", response.data);
        return response.data;
      } catch (error) {
        // Handle errors
        throw new Error("Failed to delete");
      }
    }

  //Tabel Konversi 2019
  async getListTabelKonversi2019All(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/tabelkonversi2019",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getListTabelKonversi2019All ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertTabelKonversi2019(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident/tabelkonversi2019",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert");
    }
  }

  async updateTabelKonversi2019(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/accident/tabelkonversi2019/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async deleteTabelKonversi2019(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/accident/tabelkonversi2019/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

  //Report History
  async getListReportHistoryAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/report_history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getListApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async insertReportHistory(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/accident/report_history",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ insertApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to insert");
    }
  }

  async deleteReportHistory(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/accident/report_history/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ deleteApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to delete");
    }
  }

  async updateReportHistory(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/accident/report_history/" + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ updateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to update");
    }
  }

  async getChartFrequncyRate(token: string, tahun: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/chart_frequency_rate/" + tahun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getChartFrequencyRateApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getChartSeverityRate(token: string, tahun: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/chart_severity_rate/" + tahun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getChartSeverityRate ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

  async getChartIntensitasAirRate(token: string, tahun: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/accident/chart_intensitas_air/" + tahun,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🚀 ~ getChartIntensitasAirRate ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }
}
