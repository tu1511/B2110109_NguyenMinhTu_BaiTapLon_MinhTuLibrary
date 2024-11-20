import mongoose from "mongoose";

const bookCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

export default BookCategory;
