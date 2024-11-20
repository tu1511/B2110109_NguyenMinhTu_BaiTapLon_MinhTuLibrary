import createApiClient from "./api.service";

class UserService {
  constructor(path = "/users") {
    this.api = createApiClient(path);
  }

  // Lấy danh sách người dùng với phân trang
  async getUsers(page = 1, limit = 10) {
    try {
      const response = await this.api.get("/all", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Cập nhật thông tin người dùng
  async updateUser(id, userData) {
    try {
      const response = await this.api.put(`/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Xóa người dùng
  async deleteUser(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default new UserService();
