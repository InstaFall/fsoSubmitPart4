const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogDocument = new Blog(blog)
    await blogDocument.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the id property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
})

test('the first blog\'s title is Example ', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.map((el) => el.title)).toContain('Example')
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Zort',
    author: 'CanDoe',
    url: 'http://example.org',
    likes: 32
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((el) => el.title)
  expect(titles).toContain('Zort')
})

test('blog missing likes defaults to 0', async () => {
  const faultyBlog = {
    title: 'A Big Title',
    author: 'John Smith',
    url: 'http://example.org',
  }
  const response = await api
    .post('/api/blogs')
    .send(faultyBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog missing title or url is not added', async () => {
  const missingUrl = {
    title: 'Missing Url',
    author: 'Comte',
    likes: 4
  }

  const missingTitle = {
    author: 'MY G',
    likes: 4,
    url: 'http://example.org'
  }
  await api
    .post('/api/blogs')
    .send(missingTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(missingUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
},100000)

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  console.log('response body is : ',resultBlog.body)
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(el => el.title)
  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})