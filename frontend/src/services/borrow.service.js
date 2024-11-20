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
}

export default new borrowService();
