import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// Route tạo mới thể loại sách
router.post("/create", createCategory);

// Route lấy tất cả thể loại sách
router.get("/all", getAllCategories);

// Route lấy thể loại sách theo ID
router.get("/find/:id", getCategoryById);

// Route cập nhật thể loại sách theo ID
router.put("/update/:id", updateCategory);

// Route xóa thể loại sách theo ID
router.delete("/delete/:id", deleteCategory);

export default router;
