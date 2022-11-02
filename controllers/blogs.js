const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (req,res) => {
  const result = await Blog.find({})
  res.json(result)
})

blogRouter.get('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }

})

blogRouter.post('/', async (req,res) => {
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

blogRouter.delete('/:id', async (req,res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req,res) => {
  const body = req.body
  const updatedBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
  res.json(result)
})

module.exports = blogRouter