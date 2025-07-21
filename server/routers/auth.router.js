import authController from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/auth/signup
router.post("/signup", authController.signUp);

export default router;
