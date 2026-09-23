
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to CuraMed Admin Dashboard",
      admin: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

export default router;

