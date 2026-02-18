import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ⭐ THIS FIELD WAS MISSING
    amountReceived: {
      type: Number,
      default: 0,
    },

    productCost: {
      type: Number,
      default: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    unitPrice: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "SALE",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
