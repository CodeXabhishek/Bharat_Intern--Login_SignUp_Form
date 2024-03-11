const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
const viewRouter = require('./routers/view-router');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Hello from middleware function');
  next();
});
app.use('/', viewRouter);

module.exports = app;
