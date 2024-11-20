import mongoose from "mongoose";

const borrowTransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: Date, // Không đặt `required` để có thể cập nhật sau
  returnedDate: Date,
  status: {
    type: String,
    enum: ["processing", "borrowed", "returned", "late", "cancelled"],
    default: "processing", // Khởi tạo với trạng thái "processing"
  },
});

const BorrowTransaction = mongoose.model(
  "BorrowTransaction",
  borrowTransactionSchema
);

export default BorrowTransaction;
