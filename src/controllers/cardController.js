const MongooseError = require('mongoose').Error;
const Card = require('../models/cardModel');
const { CardAPIModel, DocumentDeleteAPIModel } = require('../utils/APIModels');
const { BadRequestError, NotFoundError } = require('../utils/errors');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send(cards.map((card) => new CardAPIModel(card))))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card
    .create({ name, link, owner: ownerId })
    .then((card) => res.status(201).send(new CardAPIModel(card)))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      else next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) next(new NotFoundError(`Карточка с указанным id ${cardId} не найдена`));
      else res.send(new DocumentDeleteAPIModel('Пост удален'));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Карточка с указанным id ${cardId} не найдена`));
      else next(err);
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (card === null) next(new NotFoundError(`Передан несуществующий id ${cardId} карточки`));
      else res.send(new CardAPIModel(card));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Передан несуществующий id ${cardId} карточки`));
      else if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      else next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (card === null) next(new NotFoundError(`Передан несуществующий id ${cardId} карточки`));
      else res.send(new CardAPIModel(card));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) next(new NotFoundError(`Передан несуществующий id ${cardId} карточки`));
      else if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      else next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
