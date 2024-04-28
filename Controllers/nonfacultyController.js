const fs = require('fs');

const faculty = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/faculty.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Faculty id is: ${val}`);

  if (req.params.id * 1 > faculty.length) {
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

exports.getAllfaculty = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: faculty.length,
    data: {
      faculty
    }
  });
};

exports.getfaculty = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const faculties = faculty.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      faculties
    }
  });
};

exports.createfaculty = (req, res) => {
  // console.log(req.body);

  const newId = faculty[faculty.length - 1].id + 1;
  const newfaculty = Object.assign({ id: newId }, req.body);

  faculty.push(newfaculty);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(faculty),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newfaculty
        }
      });
    }
  );
};

exports.updatefaculty = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      Student: '<Updated Student here...>'
    }
  });
};

exports.deletefaculty = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
