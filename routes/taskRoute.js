const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });


router.get('/', taskController.getTasks);
router.post('/', upload.single('image'), taskController.addTask);
router.put('/:id', upload.single('image'), taskController.editTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id', taskController.getTask);

module.exports = router;
