import createApiClient from "./api.service";

class borrowService {
  constructor(path = "/borrow") {
    this.api = createApiClient(path);
  }

  // Phương thức để tạo giao dịch mượn sách
  async createBorrowTransaction(data) {
    try {
      const response = await this.api.post("/", data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch mượn sách:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  }

  async getBorrowTransactionsByUser(userId) {
    try {
      const response = await this.api.get(`/${userId}`);
      return response.data; // Trả về danh sách giao dịch
    } catch (error) {
      console.error("Lỗi khi lấy giao dịch mượn sách:", error);
      throw error; // Ném lỗi ra ngoài để xử lý
    }
  }

  async getAllBorrowTransactions() {
    try {
      const response = await this.api.get("/");
      return response.data; // Trả về danh sách giao dịch
    } catch (error) {
      console.error("Lỗi khi lấy danh sách giao dịch mượn sách:", error);
      throw error; // Ném lỗi ra ngoài để xử lý
    }
  }

  // Hủy giao dịch mượn sách
  async cancelBorrowTransaction(transactionId) {
    try {
      const response = await this.api.patch(`/${transactionId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi hủy giao dịch mượn sách:", error);
      throw error;
    }
  }

  async borrowBook(transactionId) {
    try {
      const response = await this.api.patch(`/${transactionId}/borrow`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái mượn sách:", error);
      throw error;
    }
  }

  async updateReturnTransaction(transactionId) {
    try {
      const response = await this.api.patch(`/${transactionId}/return`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái trả sách:", error);
      throw error;
    }
  }

  async deleteBorrowTransaction(transactionId) {
    try {
      const response = await this.api.delete(`/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi xóa giao dịch mượn sách:", error);
      throw error;
    }
  }

  async getBorrowTransactionById(transactionId) {
    try {
      const response = await this.api.get(`/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy giao dịch mượn sách:", error);
      throw error;
    }
  }

  async countOrders() {
    try {
      const response = await this.api.get("/count");
      return response.data.count;
    } catch (error) {
      console.error("Lỗi khi đếm số giao dịch mượn sách:", error);
      throw error;
    }
  }
}

export default new borrowService();
