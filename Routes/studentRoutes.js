const express = require('express');
const studentController = require('./../Controllers/studentController');

const router = express.Router();

router.param('id', studentController.checkID);

router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.checkBody, studentController.createStudent);

router
  .route('/:id')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
