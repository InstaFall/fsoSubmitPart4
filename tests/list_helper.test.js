const { favoriteBlog, mostBlogs , dummy, totalLikes } = require('../utils/list_helper')

const blogList = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
},
{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
},
{
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
},
{
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
},
{
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
},
{
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}]
const empty = []
const oneBlog = [{
  title: 'Example',
  author: 'Lorem',
  url: 'Ipsum',
  likes: 25
}]

test('Dummy returns 1', () => {
  const blogs = []
  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('Total Likes', () => {
  test('of empty list', () => {
    expect(totalLikes(empty)).toBe(0)
  })

  test('of one blog is equal to that blog\'s likes', () => {
    expect(totalLikes(oneBlog)).toBe(25)
  })

  test('of multiple blogs is equal to the sum of their likes', () => {
    expect(totalLikes(blogList)).toBe(36)
  })
})

describe('Favorite blog', () => {
  test('of blogList is Canonical String Reduction', () => {
    expect(favoriteBlog(blogList)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0 })
  })
})

describe('The one with the most blogs', () => {
  const testArr = [
    {
      author: 'First Author',
      blogs: 25,
      title: 'Zort'
    },
    {
      author: 'Second Author',
      blogs: 10,
      title: 'Nediyo'
    },{
      author: 'Third Author',
      blogs: 30,
      title: 'Zortingen'
    },
  ]
  test('is ', () => {
    expect(mostBlogs(testArr)).toEqual({
      author: 'Third Author',
      blogs: 30
    })
  })
})
