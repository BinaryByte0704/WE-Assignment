const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

// const globalErrorHandler = require("./controllers/errorController");
const AppError = require('./Utils/appErrors');
const studentRouter = require('./Routes/studentRoutes');
const facultyRouter = require('./Routes/teachFacultyRoutes');
const nonTeachRouter = require('./Routes/nonTeachFacultyRoutes');
// const examDeptRouter = require('./Routes/examDeptRoutes');
// const placementDeptRouter = require('./Routes/placementDeptRoutes');

const app = express();

//1)MiddleWares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//NOTE This is the middleware we need to use
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//TODO The tours on right hand side of json is of the tours variable used above

//TODO always specify the version so that you can make changes to the new version and let users still operate on previous one.

//2) Route handlers

//3) Mounting Routes
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/faculty', facultyRouter);
app.use('/api/v1/nonfaculty', nonTeachRouter);
// app.use('/api/v1/exams', examDeptRouter);
// app.use('/api/v1/placements', placementDeptRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//4) Start Server

//NOTE Used to start the app rather than using http package like in node

//NOTE Run the app using nodemon command
module.exports = app;
