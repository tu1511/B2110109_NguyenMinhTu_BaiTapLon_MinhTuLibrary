import Inventory from "../models/inventory.model.js";
import BookCategory from "../models/bookCategory.model.js";

// Thêm mới inventory
export const addInventory = async (req, res) => {
  const { bookId, totalCopies, availableCopies } = req.body;
  try {
    const newInventory = new Inventory({
      bookId,
      totalCopies,
      availableCopies,
    });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sách vào kho", error });
  }
};

// Lấy danh sách toàn bộ inventory
export const getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().populate({
      path: "bookId",
      populate: {
        path: "categoryId", // Đường dẫn tới category trong Book
        model: "BookCategory",
        select: "name", // Lấy tên của category
      },
    });
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sách", error });
  }
};

// Lấy chi tiết inventory của một sách cụ thể
export const getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findById(id).populate({
      path: "bookId",
      populate: {
        path: "categoryId", // Đường dẫn tới category trong Book
        model: "BookCategory",
        select: "name", // Lấy tên của category
      },
    });
    if (!inventory) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết sách", error });
  }
};

// Cập nhật inventory của một sách cụ thể
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { totalCopies, availableCopies } = req.body;
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { totalCopies, availableCopies },
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thông tin sách", error });
  }
};

// Xóa một inventory
export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: "Không tìm thấy sách để xóa" });
    }
    res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sách", error });
  }
};
