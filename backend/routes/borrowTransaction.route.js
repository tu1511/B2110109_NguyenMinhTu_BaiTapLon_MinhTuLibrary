import express from "express";
import {
  createBorrowTransaction,
  borrowBook,
  getAllBorrowTransactions,
  getBorrowTransactionsByUser,
  updateReturnTransaction,
  deleteBorrowTransaction,
  cancelBorrowTransaction,
} from "../controllers/borrowTransaction.controller.js";

const router = express.Router();

router.post("/", createBorrowTransaction); // Tạo giao dịch mới
router.patch("/:transactionId/borrow", borrowBook); // Cập nhật trạng thái thành "borrowed"
router.get("/", getAllBorrowTransactions); // Lấy danh sách giao dịch
router.get("/:userId", getBorrowTransactionsByUser); // Lấy giao dịch theo user
router.patch("/:transactionId/return", updateReturnTransaction); // Cập nhật trạng thái khi trả sách
router.delete("/:transactionId", deleteBorrowTransaction); // Xóa giao dịch
router.patch("/:transactionId/cancel", cancelBorrowTransaction); // Hủy đơn hàng

export default router;
