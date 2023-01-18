import express from "express";
const router = express.Router();
import {
  getUsers,
  addUser,
  getUserById,
  deleteUserById,
  login,
} from "../controller/userController.js";

router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUserById).delete(deleteUserById);
router.route("/login").post(login);

export default router;
