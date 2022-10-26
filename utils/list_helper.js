/*  eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  //if (blogs.length > 0) {
  let sum = 0
  for (const blog of blogs){
    sum += blog.likes
  }
  return sum
  //} else return 0
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev,curr) => prev.likes > curr.likes ? prev : curr)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}