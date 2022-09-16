const authorization = (req, res, next) => {
  req.user = {
    _id: '631efb2d9a828dce250c0779',
  };

  next();
};

module.exports = authorization;
