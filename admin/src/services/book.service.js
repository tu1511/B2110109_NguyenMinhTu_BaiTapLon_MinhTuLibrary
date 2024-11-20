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

  async addBook(bookData) {
    try {
      const response = await this.api.post("/create", bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error);
    }
  }

  async updateBook(bookId, bookData) {
    try {
      const response = await this.api.put(`/update/${bookId}`, bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error);
    }
  }
}

export default new bookService();
