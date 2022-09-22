const cardRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { cardSchemaConstants } = require('../models/cardModel');

// Declare some repeating model schemas for Joi validation
// See: https://joi.dev/ & https://github.com/arb/celebrate
const cardIdSchema = Joi.string().alphanum().length(24);

// Define routes
cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .min(cardSchemaConstants.nameMinLength)
      .max(cardSchemaConstants.nameMaxLength),
    link: Joi.string().uri(),
  }),
}), createCard);
cardRouter.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: cardIdSchema }),
}), deleteCard);
cardRouter.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: cardIdSchema }),
}), likeCard);
cardRouter.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: cardIdSchema }),
}), dislikeCard);

module.exports = cardRouter;
