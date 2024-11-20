import createApiClient from "./api.service";

class UserService {
  constructor(path = "/users") {
    this.api = createApiClient(path);
  }

  // Lấy danh sách người dùng với phân trang
  async getUsers() {
    try {
      const response = await this.api.get("/all");
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

  async updateUserRole(userId, payload) {
    try {
      const response = await this.api.patch(`/role/${userId}`, payload);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật vai trò");
    }
  }

  async countUsers() {
    try {
      const response = await this.api.get("/count");
      return response.data.count;
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }

  async countBooks() {
    try {
      const response = await this.api.get("/countbook");
      return response.data.count;
    } catch (error) {
      console.error("Error counting books:", error);
      throw error;
    }
  }

  async countBooks() {
    try {
      const response = await this.api.get("/countbook");
      return response.data.count;
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }

  async countOrders() {
    try {
      const response = await this.api.get("/countorder");
      return response.data.count;
    } catch (error) {
      console.error("Error counting orders:", error);
      throw error;
    }
  }
}

export default new UserService();
