import createApiClient from "./api.service";

class categoryService {
  constructor(path = "/category") {
    this.api = createApiClient(path);
  }

  async getAll() {
    try {
      const response = await this.api.get("/all");
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new categoryService();
