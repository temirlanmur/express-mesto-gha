const Card = require('../models/cardModel');
const MONGOOSE_ERROR_NAMES = require('../constants/mongooseErrorNames');
const HTTP_STATUS_CODES = require('../constants/httpStatusCodes');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card
    .create({ name, link, owner: ownerId })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
          break;
        }
        default:
          next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (card === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Карточка с указанным id ${cardId} не найдена` });
      else res.send(card);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Карточка с указанным id ${cardId} не найдена` });
          break;
        }
        default:
          next(err);
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
      if (card === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Передан несуществующий id ${cardId} карточки` });
      else res.send(card);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Передан несуществующий id ${cardId} карточки` });
          break;
        }
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
          break;
        }
        default:
          next(err);
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
      if (card === null) res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Передан несуществующий id ${cardId} карточки` });
      else res.send(card);
    })
    .catch((err) => {
      switch (err.name) {
        case MONGOOSE_ERROR_NAMES.CAST_ERROR: {
          res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: `Передан несуществующий id ${cardId} карточки` });
          break;
        }
        case MONGOOSE_ERROR_NAMES.VALIDATION_ERROR: {
          res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' });
          break;
        }
        default:
          next(err);
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
