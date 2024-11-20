import createApiClient from "./api.service";

class bookService {
  constructor(path = "/books") {
    this.api = createApiClient(path);
  }

  async getAllBooks() {
    try {
      const response = await this.api.get("/all");
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getBookById(bookId) {
    try {
      const response = await this.api.get(`/${bookId}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new bookService();
