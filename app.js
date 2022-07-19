const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

const routerUsers = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62d53d6627aca8be5f3d4e2d',
  };
  next();
});

app.use('/users', routerUsers);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не обнаружена' });
});

app.listen(PORT, () => {
  console.log('Сервер работает корректно');
});
