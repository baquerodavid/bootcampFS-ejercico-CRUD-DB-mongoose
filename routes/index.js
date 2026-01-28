const express = require("express");
const router = express.Router();
const tasksRoutes = require("./tasks");

router.use("/", tasksRoutes);
// router.use("/task", taskRouter);

module.exports = router;
