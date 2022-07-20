const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const getCertainUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данныые. Не удалось создать нового пользователя' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден. Не удалось обновить информацию' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Указаны некорректные данные при обновлении пользователя' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден. Не удалось обновить информацию' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Указаны некорректные данные при обновлении аватара' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

module.exports = {
  getAllUsers, getCertainUser, createNewUser, updateProfile, updateUserAvatar,
};
