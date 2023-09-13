const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let fav = blogs.reduce((mostLiked, blog) => {
        return blog.likes > mostLiked.likes ? blog : mostLiked
    })
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const mostBlogsByAuthor = (blogs) => {
    const authorCountMap = {}
    let mostBlogsAuthor = ''
    let mostBlogsCount = 0

    blogs.forEach((blog) => {
      const author = blog.author
      if (authorCountMap[author]) {
        authorCountMap[author] += 1
      } else {
        authorCountMap[author] = 1
      }

      if (authorCountMap[author] > mostBlogsCount) {
        mostBlogsCount = authorCountMap[author]
        mostBlogsAuthor = author
      }
    })

    return {
      author: mostBlogsAuthor,
      blogs: mostBlogsCount,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogsByAuthor
}