const dummy = (blogs) => { // eslint-disable-line no-unused-vars
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

module.exports = {
  dummy,
  totalLikes
}