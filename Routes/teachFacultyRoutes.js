const express = require('express');
const facultyController = require('./../Controllers/facultyControllers');

const router = express.Router();

router.param('id', facultyController.checkID);

router
  .route('/')
  .get(facultyController.getAllfaculty)
  .post(facultyController.checkBody, facultyController.createfaculty);

router
  .route('/:id')
  .get(facultyController.getfaculty)
  .patch(facultyController.updatefaculty)
  .delete(facultyController.deletefaculty);

module.exports = router;
