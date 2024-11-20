import BookCategory from "../models/bookCategory.model.js";

// Tạo mới một thể loại sách
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Kiểm tra nếu thể loại sách đã tồn tại
    const existingCategory = await BookCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Thể loại sách đã tồn tại!" });
    }

    const newCategory = new BookCategory({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả thể loại sách
export const getAllCategories = async (req, res) => {
  try {
    const categories = await BookCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thể loại sách theo ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await BookCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Thể loại sách không tồn tại" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thể loại sách theo ID
export const updateCategory = async (req, res) => {
  try {
    const category = await BookCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Trả về đối tượng sau khi đã được cập nhật
    );
    if (!category) {
      return res.status(404).json({ message: "Thể loại sách không tồn tại" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa thể loại sách theo ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await BookCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Thể loại sách không tồn tại" });
    }
    res.status(200).json({ message: "Thể loại sách đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
