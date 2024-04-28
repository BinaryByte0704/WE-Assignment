const fs = require('fs');

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/faculty.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Student id is: ${val}`);

  if (req.params.id * 1 > students.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: students.length,
    data: {
      students
    }
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const student = students.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      student
    }
  });
};

exports.createStudent = (req, res) => {
  // console.log(req.body);

  const newId = students[students.length - 1].id + 1;
  const newstudent = Object.assign({ id: newId }, req.body);

  students.push(newstudent);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(students),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newstudent
        }
      });
    }
  );
};

exports.updateStudent = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      Student: '<Updated Student here...>'
    }
  });
};

exports.deleteStudent = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
