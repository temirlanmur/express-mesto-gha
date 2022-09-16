const Card = require('../models/cardModel');
const CardAPIModel = require('../utils/APIModels/CardAPIModel');
const DocumentDeleteAPIModel = require('../utils/APIModels/DocumentDeleteAPIModel');
const ErrorAPIModel = require('../utils/APIModels/ErrorAPIModel');
const MONGOOSE_ERROR_NAMES = require('../constants/mongooseErrorNames');
const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');

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
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send(new CardAPIModel(card)))
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные при создании карточки'));
        default:
          return next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Карточка с указанным id ${cardId} не найдена`));
      return res.send(new DocumentDeleteAPIModel('Пост удален'));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Карточка с указанным id ${cardId} не найдена`));
        default:
          return next(err);
      }
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
      if (card === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Передан несуществующий id ${cardId} карточки`));
      return res.send(new CardAPIModel(card));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Передан несуществующий id ${cardId} карточки`));
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные для постановки лайка'));
        default:
          return next(err);
      }
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
      if (card === null) return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Передан несуществующий id ${cardId} карточки`));
      return res.send(new CardAPIModel(card));
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR:
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).send(new ErrorAPIModel(`Передан несуществующий id ${cardId} карточки`));
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR:
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(new ErrorAPIModel('Переданы некорректные данные для снятия лайка'));
        default:
          return next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
