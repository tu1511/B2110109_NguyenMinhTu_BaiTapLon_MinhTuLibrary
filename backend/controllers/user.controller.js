import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import BorrowTransaction from "../models/borrowTransaction.model.js";

// Lấy danh sách tất cả người dùng (Có phân trang)
export const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Mặc định lấy trang 1 và giới hạn 10 người dùng mỗi trang

  try {
    const users = await User.find()
      .skip((page - 1) * limit) // Tính toán bỏ qua các người dùng đã lấy ở các trang trước
      .limit(parseInt(limit)) // Giới hạn số lượng người dùng trả về
      .exec();

    const totalUsers = await User.countDocuments(); // Tổng số người dùng để tính số trang
    res.status(200).json({ users, totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const userExists = await User.findById(id); // Kiểm tra người dùng có tồn tại không
    if (!userExists) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // Trả về bản ghi mới sau khi cập nhật
    );

    res
      .status(200)
      .json({ message: "Thông tin người dùng đã được cập nhật.", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await User.findById(id); // Kiểm tra người dùng có tồn tại không
    if (!userExists) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Người dùng đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ!" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Cập nhật vai trò thành công!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Không thể cập nhật vai trò", error });
  }
};

export const countUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Đếm số lượng người dùng trong cơ sở dữ liệu
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error("Lỗi khi đếm số người dùng:", error);
    res.status(500).json({ message: "Lỗi khi tính số người dùng" });
  }
};

export const countBooks = async (req, res) => {
  try {
    const bookCount = await Book.countDocuments(); // Đếm số lượng sách trong collection
    res.status(200).json({ count: bookCount }); // Trả về số lượng sách
  } catch (error) {
    console.error("Lỗi khi đếm số lượng sách:", error);
    res.status(500).json({ message: "Lỗi khi tính số lượng sách" }); // Nếu có lỗi thì trả về lỗi 500
  }
};

export const countOrders = async (req, res) => {
  try {
    const orderCount = await BorrowTransaction.countDocuments(); // Đếm số lượng đơn hàng trong collection
    res.status(200).json({ count: orderCount }); // Trả về số lượng đơn hàng
  } catch (error) {
    console.error("Lỗi khi đếm số lượng đơn hàng:", error);
    res.status(500).json({ message: "Lỗi khi tính số lượng đơn hàng" }); // Nếu có lỗi thì trả về lỗi 500
  }
};
