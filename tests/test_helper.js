const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Example',
    author: 'Author One',
    url: 'http://example.org',
    likes: 20
  },
  {
    title: 'My Blog',
    author: 'Can',
    url: 'http://example.org',
    likes: 302
  }
]

const nonExistingId = async () => {
  const dummyBlog = new Blog({ title:'blog will be removed', url:'lorem', author:'ipsum', likes:0 })

  await dummyBlog.save()
  await dummyBlog.remove()
  return dummyBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((el) => el.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((el) => el.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}