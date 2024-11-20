import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
