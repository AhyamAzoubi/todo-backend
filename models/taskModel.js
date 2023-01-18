import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
  done: { type: Boolean, default: false },
});
const TaskModel = mongoose.model("task", taskSchema);
export default TaskModel;
