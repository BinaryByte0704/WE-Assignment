const express = require('express');
const nonFacultyController = require('../Controllers/nonfacultyController');

const router = express.Router();

router.param('id', nonFacultyController.checkID);

router
  .route('/')
  .get(nonFacultyController.getAllfaculty)
  .post(nonFacultyController.checkBody, nonFacultyController.createfaculty);

router
  .route('/:id')
  .get(nonFacultyController.getfaculty)
  .patch(nonFacultyController.updatefaculty)
  .delete(nonFacultyController.deletefaculty);

module.exports = router;
