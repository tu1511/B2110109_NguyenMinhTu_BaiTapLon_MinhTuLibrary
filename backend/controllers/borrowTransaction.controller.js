import BorrowTransaction from "../models/borrowTransaction.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";

// 1. Tạo một giao dịch mượn sách mới với trạng thái "processing"
export const createBorrowTransaction = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    if (!user || !book) {
      return res
        .status(404)
        .json({ message: "Người dùng hoặc sách không tồn tại." });
    }

    const borrowTransaction = new BorrowTransaction({
      userId,
      bookId,
      status: "processing",
    });
    await borrowTransaction.save();

    res.status(201).json(borrowTransaction);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo giao dịch mượn sách", error });
  }
};

// 2. Cập nhật trạng thái giao dịch thành "borrowed" và thiết lập ngày trả sau 7 ngày
export const borrowBook = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await BorrowTransaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại." });
    }

    if (transaction.status !== "processing") {
      return res
        .status(400)
        .json({ message: "Chỉ có thể cập nhật từ trạng thái processing." });
    }

    transaction.status = "borrowed";
    transaction.borrowedDate = new Date();
    transaction.dueDate = new Date(transaction.borrowedDate);
    transaction.dueDate.setDate(transaction.dueDate.getDate() + 7);

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật giao dịch mượn sách", error });
  }
};

// 3. Lấy danh sách tất cả giao dịch mượn sách
export const getAllBorrowTransactions = async (req, res) => {
  try {
    const borrowTransactions = await BorrowTransaction.find()
      .populate("userId", "fullname")
      .populate("bookId", "title dueDate");
    res.status(200).json(borrowTransactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách giao dịch mượn sách", error });
  }
};

// 4. Lấy giao dịch theo người dùng
export const getBorrowTransactionsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const borrowTransactions = await BorrowTransaction.find({
      userId,
    }).populate("bookId", "title dueDate");
    res.status(200).json(borrowTransactions);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy giao dịch mượn sách cho người dùng",
      error,
    });
  }
};

// 5. Cập nhật giao dịch khi trả sách
export const updateReturnTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Tìm giao dịch mượn sách theo transactionId
    const transaction = await BorrowTransaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại" });
    }

    // Cập nhật ngày trả sách là ngày hiện tại
    transaction.returnedDate = new Date(); // Sử dụng ngày hiện tại

    // Cập nhật trạng thái giao dịch
    transaction.status =
      new Date(transaction.returnedDate) > new Date(transaction.dueDate)
        ? "late" // Nếu trả muộn
        : "returned"; // Nếu trả đúng hạn

    // Lưu giao dịch vào cơ sở dữ liệu
    await transaction.save();

    // Trả về kết quả sau khi cập nhật
    res.status(200).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật giao dịch mượn sách", error });
  }
};

// 6. Xóa giao dịch
export const deleteBorrowTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await BorrowTransaction.findByIdAndDelete(
      transactionId
    );

    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại" });
    }

    res.status(200).json({ message: "Xóa giao dịch thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa giao dịch mượn sách", error });
  }
};

// 7. Lấy giao dịch mượn sách theo ID
export const getBorrowTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await BorrowTransaction.findById(transactionId)
      .populate("userId", "name")
      .populate("bookId", "title");
    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy giao dịch mượn sách", error });
  }
};

// 8. Hủy giao dịch mượn sách
export const cancelBorrowTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await BorrowTransaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Giao dịch không tồn tại" });
    }

    if (transaction.status !== "processing") {
      return res
        .status(400)
        .json({ message: "Chỉ có thể hủy giao dịch đang xử lý." });
    }

    transaction.status = "cancelled";
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy giao dịch mượn sách", error });
  }
};
