import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Đăng ký người dùng
router.post("/register", registerUser);

// Đăng nhập người dùng
router.post("/login", loginUser);

router.post("/loginadmin", loginAdmin);

export default router;
