const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST /create - Crear una tarea
router.post("/create", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).send({ message: "Title is required" });
    }

    const task = await Task.create({ title });
    return res.status(201).send(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating task" });
  }
});

// GET / - Traer todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error getting tasks" });
  }
});

// GET /id/:_id - Buscar tarea por id
router.get("/id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error getting task" });
  }
});

//PUT /markAsCompleted/:_id - Marcar como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const task = await Task.findByIdAndUpdate(
      _id,
      { completed: true },
      { new: true },
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error marking task as completed" });
  }
});

// PUT /id/:_id - Actualizar solo el title
router.put("/id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).send({ message: "Title is required" });
    }

    // Solo permitimos actualizar title
    const task = await Task.findByIdAndUpdate(_id, { title }, { new: true });

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating task title" });
  }
});

// DELETE /id/:_id - Eliminar una tarea
router.delete("/id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting task" });
  }
});

module.exports = router;


// 👇 CODIGO DE LA LIVE REVIEW EMPIEZA DESDE AQUÍ 👇

/* 
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

router.post("/create", taskController.createTask);
router.get("/", taskController.getAllTasks);

router.get("/id/:_id", taskController.getTaskById);

router.put("/markAsCompleted/:_id", taskController.markAsCompleted);

router.put("/id/:_id", taskController.changeTitle);
router.delete("/id/:_id", taskController.deleteTask);

module.exports = router; 
*/