import Book from "../models/book.model.js";
import BookCategory from "../models/bookCategory.model.js";

// Thêm sách với ảnh
export const addBook = async (req, res) => {
  const {
    title,
    author,
    isbn,
    categoryId,
    publisher,
    publishedDate,
    totalCopies,
    availableCopies,
  } = req.body;
  const image = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh nếu có

  try {
    // Kiểm tra xem thể loại có tồn tại không
    const category = await BookCategory.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Thể loại không tồn tại." });
    }

    // Kiểm tra xem sách có trùng ISBN không
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "ISBN đã tồn tại." });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      categoryId,
      publisher,
      publishedDate,
      totalCopies,
      availableCopies,
      image, // Lưu đường dẫn hình ảnh vào cơ sở dữ liệu
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sách." });
  }
};

// Lấy tất cả sách
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate({
      path: "categoryId",
      model: "BookCategory",
      select: "name",
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sách." });
  }
};

// Lấy thông tin một sách theo ID
export const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId).populate({
      path: "categoryId",
      model: "BookCategory",
      select: "name",
    });
    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sách." });
  }
};

// Cập nhật thông tin sách theo ID
export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const {
    title,
    author,
    isbn,
    categoryId,
    publisher,
    publishedDate,
    totalCopies,
    availableCopies,
  } = req.body;
  const image = req.file ? req.file.path : null; // Lấy đường dẫn hình ảnh mới nếu có

  try {
    // Kiểm tra xem sách có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    // Kiểm tra xem thể loại có tồn tại không
    const category = await BookCategory.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Thể loại không tồn tại." });
    }

    // Cập nhật thông tin sách
    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.categoryId = categoryId || book.categoryId;
    book.publisher = publisher || book.publisher;
    book.publishedDate = publishedDate || book.publishedDate;
    book.totalCopies = totalCopies || book.totalCopies;
    book.availableCopies = availableCopies || book.available;
    book.image = image || book.image; // Cập nhật hình ảnh nếu có

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sách." });
  }
};

// Xóa sách theo ID
export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }
    res.status(200).json({ message: "Sách đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sách." });
  }
};
