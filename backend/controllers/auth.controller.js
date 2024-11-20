import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Đăng ký người dùng mới
export const registerUser = async (req, res) => {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    role = "user",
  } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "Người dùng đã được tạo thành công.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập người dùng
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Đăng nhập thành công.", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập cho người dùng có quyền admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });

    // Kiểm tra nếu không tồn tại người dùng
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại." });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }

    // Kiểm tra quyền admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập admin." });
    }

    // Tạo JWT token cho người dùng
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token có thời gian sống 1 giờ
      }
    );

    // Trả về token và thông tin người dùng
    res.status(200).json({ message: "Đăng nhập thành công.", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
