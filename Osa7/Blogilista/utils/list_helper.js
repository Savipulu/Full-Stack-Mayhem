const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  const addition = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(addition, 0)
}

const favoriteBlog = blogs => {
  //TODO: JavaScriptmaisempi ratkaisu?
  let blog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blog.likes) {
      blog = blogs[i]
    }
  }
  return blog
}

const mostBlogs = blogs => {
  const authors = {}
  for (let i = 0; i < blogs.length; i++) {
    let key = blogs[i].author
    if (authors[key] === undefined) {
      authors[key] = 1
    } else {
      authors[key]++
    }
  }
  let favorite = findMaxFromReducedDictionary(authors, blogs[0].author)
  return { author: favorite, blogs: authors[favorite] }
}

const mostLikes = blogs => {
  const authors = {}
  for (let i = 0; i < blogs.length; i++) {
    let key = blogs[i].author
    if (authors[key] === undefined) {
      authors[key] = blogs[i].likes
    } else {
      authors[key] += blogs[i].likes
    }
  }
  let mostLiked = findMaxFromReducedDictionary(authors, blogs[0].author)
  return { author: mostLiked, likes: authors[mostLiked] }
}

const findMaxFromReducedDictionary = (dict, starterValue) => {
  let max = starterValue
  Object.keys(dict).forEach(key => {
    if (dict[key] > dict[max]) {
      max = key
    }
  })
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
