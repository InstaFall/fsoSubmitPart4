const { response } = require('express')
const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', (req,res) => {
  Blog.find({}).then(result => {
    res.json(result)
  })
})

router.get('/:id', (req,res,next) => {
  Blog.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.post('/', (req,res,next) => {
  const body = req.body
  const newDoc = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })

  newDoc.save()
    .then(result => {
      res.json(result)
    })
    .catch(err => next(err))
})

router.delete('/:id', (req,res,next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

router.put('/:id', (req,res,next) => {
  const body = req.body
  const updatedBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
    .then(result => {
      res.json(result)
    })
    .catch(err => next(err))
})

module.exports = router