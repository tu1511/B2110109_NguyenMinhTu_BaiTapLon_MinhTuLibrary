import express from "express";
import upload from "../middleware/multer.js";
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// Thêm sách (bao gồm ảnh)
router.post("/create", upload.single("image"), addBook);

// Lấy tất cả sách
router.get("/all", getAllBooks);

// Lấy thông tin sách theo ID
router.get("/:bookId", getBookById);

// Cập nhật sách theo ID (có thể có ảnh mới)
router.put("/update/:bookId", upload.single("image"), updateBook);

// Xóa sách theo ID
router.delete("/delete/:bookId", deleteBook);

export default router;
