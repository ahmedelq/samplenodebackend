const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.token = decodedToken;
    if (!token || !decodedToken) { response.status(401).json({ error: 'forbidden operation' }); }
  }
  next();
};

module.exports = tokenExtractor;
