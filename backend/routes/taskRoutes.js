const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontrollers');

router.get('/',taskController.getalltasks);
router.post('/',taskController.createTasks);
router.patch('/:id/complete',taskController.completeTask);
router.put('/:id',taskController.updateTask);
router.delete('/:id',taskController.deleteTask);

module.exports = router;