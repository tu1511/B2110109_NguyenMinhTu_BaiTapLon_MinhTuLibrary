import createApiClient from "./api.service";

class authService {
  constructor(path = "/auth") {
    this.api = createApiClient(path);
  }

  async login(data) {
    try {
      const response = await this.api.post("/loginadmin", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new authService();
