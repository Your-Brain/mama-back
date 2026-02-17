import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE or UPDATE transaction
router.post("/", async (req, res) => {
  try {
    const { _id, ...body } = req.body;

    // ===== FORCE NUMBER CONVERSION (VERY IMPORTANT) =====
    const payload = {
      ...body,
      amountReceived: Number(body.amountReceived) || 0,
      productCost: Number(body.productCost) || 0,
      shippingCost: Number(body.shippingCost) || 0,
      quantity: Number(body.quantity) || 1,
      unitPrice: Number(body.unitPrice) || 0,
    };

    if (_id) {
      const updated = await Transaction.findByIdAndUpdate(_id, payload, {
        new: true,
      });
      return res.json(updated);
    }

    const transaction = await Transaction.create(payload);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
