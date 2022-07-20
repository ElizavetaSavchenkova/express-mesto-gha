const User = require('../models/user');

const created = 201;
const badRequestError = 400;
const notFoundError = 404;
const serverError = 500;

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch(() => {
      res.status(serverError).send({ message: 'Возникла ошибка на сервере' });
    });
};

const getCertainUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestError).send({ message: 'Введен некорректный id ' });
        return;
      }
      res.status(serverError).send({ message: 'Возникла ошибка на сервере' });
    });
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(created).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'Введены некорректные данныые. Не удалось создать нового пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'Возникла ошибка на сервере' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь не найден. Не удалось обновить информацию' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'Указаны некорректные данные при обновлении пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'Возникла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь не найден. Не удалось обновить информацию' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'Указаны некорректные данные при обновлении аватара' });
        return;
      }
      res.status(serverError).send({ message: 'Возникла ошибка на сервере' });
    });
};

module.exports = {
  getAllUsers, getCertainUser, createNewUser, updateProfile, updateUserAvatar,
};
