import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  updateRole,
  countUsers,
  countBooks,
  countOrders,
} from "../controllers/user.controller.js";
// import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Lấy danh sách tất cả người dùng (yêu cầu xác thực)
router.get("/all", getUsers);

// Cập nhật thông tin người dùng (yêu cầu xác thực)
router.put("/:id", updateUser);

router.patch("/role/:id", updateRole);

// Xóa người dùng (yêu cầu xác thực)
router.delete("/:id", deleteUser);

// đếm số nguoi dung
router.get("/count", countUsers);
router.get("/countbook", countBooks);
router.get("/countorder", countOrders);

export default router;
