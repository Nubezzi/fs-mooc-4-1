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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}