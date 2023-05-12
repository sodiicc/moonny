const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (
    req.method === 'OPTIONS' ||
    req.url === '/signin' ||
    req.url === '/register'
  ) {
    next()
    return
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Non Authorized' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.query.nickname = decoded.username
    next()
  } catch (e) {
    res.status(401).json({ message: 'Non Authorized' })
  }
}
