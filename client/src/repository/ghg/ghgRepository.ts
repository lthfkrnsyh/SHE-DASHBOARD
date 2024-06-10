import axios from "axios";
export class GhgRepository {
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

  async getListGhgAll(token: string): Promise<any> {
    try {
      const response = await axios.get(
        "http://localhost:4000/ghg/ghg",
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

  async insertGhg(token: string, data: FormData): Promise<any> {
    try {
      const response = await axios.post(
        "http://localhost:4000/ghg/ghg",
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

  async updateGhg(
    token: string,
    id: string,
    data: FormData
  ): Promise<any> {
    try {
      const response = await axios.put(
        "http://localhost:4000/ghg/ghg/" + id,
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

  async deleteGhg(token: string, id: string): Promise<any> {
    try {
      const response = await axios.delete(
        "http://localhost:4000/ghg/ghg/" + id,
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
}