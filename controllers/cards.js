const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ card });
    })
    .catch(() => {
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные. Не удалось создать новую карточку' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены некорректные данные. Не удалось удалить карточку' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные для постановки лайка некорректны' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные для удаления лайка некорректны' });
        return;
      }
      res.status(500).send({ message: 'Возникла ошибка на сервере' });
    });
};

module.exports = {
  getAllCards, createNewCard, deleteCard, likeCard, dislikeCard,
};
