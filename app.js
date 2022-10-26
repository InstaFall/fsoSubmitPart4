const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const router = require('./controllers/blogs')
const middleware = require('./utils/middleware')

logger.info('Connecting...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB Database!')
  })
  .catch(err => {
    logger.error(err)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/blogs', router)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app