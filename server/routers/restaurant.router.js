import restaurantController from "../controllers/restaurant.controller.js";
import authMiddleware from "../middleware/authJwt.js"; // นำ authJwt.js มาใช้ะ

import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurants
router.post(
  "/",
  authMiddleware.verifyToken, //ตรวจสอบว่า request มี JWT token ที่ถูกต้องถ้าไม่มี token หรือหมดอายุ → reject request
  authMiddleware.isModOrAdmin, // ตรวจสอบว่า user ที่ login เป็น Moderator หรือ Adminถ้าไม่ใช่ → ไม่อนุญาตให้สร้างร้านอาหาร
  restaurantController.create // ตัวนี้จะรันจริง ๆ ถ้า middleware ผ่านหมด
);
//GET http://localhost:5000/api/v1/restaurants
router.get("/", authMiddleware.verifyToken, restaurantController.getAll); // มี middleware แค่ verifyTokenต้อง login (มี JWT) ถึงจะดูรายการได้หลังจากผ่าน → controller getAll ทำงาน
//GETBYID http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", authMiddleware.verifyToken, restaurantController.getById); // ตรวจสอบ token ก่อน แล้วค่อยดึงข้อมูลร้านตาม id
//UPDATEBYID http://localhost:5000/api/v1/restaurants/:id
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isModOrAdmin,
  restaurantController.updateById
); // ต้อง login (verifyToken) ต้องเป็น Moderator หรือ Admin (isModOrAdmin)ถ้า middleware ผ่าน → controller updateById ทำงาน
//DELETEBYID http://localhost:5000/api/v1/restaurants/:id
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.deleteById
  // ต้อง login (verifyToken)ต้องเป็น Admin เท่านั้น (isAdmin) ถ้า middleware ผ่าน → controller deleteById ทำงาน
);
export default router;
