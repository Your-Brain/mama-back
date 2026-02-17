import express from "express";
import Client from "../models/Client.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// ================= GET ALL CLIENTS =================
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= CREATE OR UPDATE CLIENT =================
router.post("/", async (req, res) => {
  try {
    const { _id, name, phone, address, createdAt } = req.body;

    const payload = {
      name,
      phone,
      address: address || "",
      createdAt: createdAt || new Date(),
    };

    // UPDATE EXISTING
    if (_id) {
      const updated = await Client.findByIdAndUpdate(_id, payload, {
        new: true,
      });
      return res.json(updated);
    }

    // CREATE NEW
    const client = await Client.create(payload);
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELETE CLIENT + CASCADE =================
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);

    await Transaction.deleteMany({
      clientId: req.params.id,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
