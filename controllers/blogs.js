const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', async (req,res) => {
  const result = await Blog.find({})
  res.json(result)
})

router.get('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }

})

router.post('/', async (req,res) => {
  const body = req.body

  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })
  const savedBlog = await newBlog.save()
  res.status(201).json(savedBlog)
})

router.delete('/:id', async (req,res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
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