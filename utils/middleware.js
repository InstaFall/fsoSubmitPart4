const logger = require('./logger')

const requestLogger = (req,res,next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('----')
  next()
}

const unknownEndpoint = (req,res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req,res,next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token =  authorization.slice(7)
    console.log('inside if', authorization.slice(7))
  } else {
    req.token= null
  }
  next()
}

const errorHandler = (error,req,res,next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}