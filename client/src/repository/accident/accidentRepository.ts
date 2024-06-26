import axios from "axios";
export class AccidentRepository {
  async getListAllApi(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/accident", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async insertUser(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post("http://localhost:4000/auth", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async getUserList(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async approvedRepot(
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

  async getRoles(token: string): Promise<any> {
    try {
      const response = await axios.get("http://localhost:4000/auth/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }

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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
    }
  }

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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error("Failed to login");
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
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
      console.log("🚀 ~ loginApi ~ response:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      return [];
    }
  }
}
