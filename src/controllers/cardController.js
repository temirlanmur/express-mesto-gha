const Card = require('../models/cardModel');

async function getCards(req, res) {
  const card = await Card.find({});

  res.send({ data: card });
}

async function createCard(req, res) {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  const card = await Card.create({ name, link, owner: ownerId });

  res.send({ data: card });
}

async function deleteCard(req, res) {
  const { cardId } = req.params;

  const card = await Card.findByIdAndRemove(cardId);

  res.send({ data: card });
}

async function likeCard(req, res) {
  const { cardId } = req.params;
  const userId = req.user._id;

  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  );

  res.send({ data: card });
}

async function dislikeCard(req, res) {
  const { cardId } = req.params;
  const userId = req.user._id;

  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  );

  res.send({ data: card });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
