import TaskModel from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find();
    res.send(allTasks);
  } catch (error) {
    res.send({ message: error.message });
  }
};
const addTasks = async (req, res) => {
  try {
    const newTask = await TaskModel.create(req.body);
    res.send(newTask);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const taskById = await TaskModel.findById(id);
    res.send(taskById);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndUpdate(id, req.params.id, req.body);
    if (!task) {
      const error = new Error(`Es gibt kein Task mit der ID ${id}`);
      error.statusCode = 401;
      throw error;
    }
    res.send(task);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      const error = new Error(`Es gibt kein Task mit der ID ${id}`);
      error.statusCode = 404;
      throw error;
    }
    res.send(task);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

export { getAllTasks, addTasks, getTaskById, updateTaskById, deleteTaskById };
