import createApiClient from "./api.service";

class authService {
  constructor(path = "/auth") {
    this.api = createApiClient(path);
  }

  async login(data) {
    try {
      const response = await this.api.post("/login", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Đăng ký
  async register(data) {
    try {
      const response = await this.api.post("/register", data);
      return response.data;
    } catch (error) {
      // Xử lý lỗi rõ ràng hơn
      if (error.response) {
        return Promise.reject(
          error.response.data.message ||
            error.response.data.error ||
            "Lỗi đăng ký"
        );
      } else {
        return Promise.reject("Lỗi kết nối mạng");
      }
    }
  }
}

export default new authService();
