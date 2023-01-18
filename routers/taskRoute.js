import express from "express";
import {
  getAllTasks,
  addTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controller/taskController.js";
const router = express.Router();
router.route("/").get(getAllTasks).post(addTasks);
router
  .route("/:id")
  .get(getTaskById)
  .put(updateTaskById)
  .delete(deleteTaskById);

export default router;
