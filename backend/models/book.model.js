import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  isbn: { type: String, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "bookCategory" },
  publisher: String,
  publishedDate: Date,
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  image: { type: String, required: false }, // Thêm trường hình ảnh (URL hoặc base64)
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
