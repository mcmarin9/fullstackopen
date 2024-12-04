const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const blogsLikes = blogs.map((blog) => blog.likes);

  return blogsLikes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorBlogCounts = _.countBy(blogs, "author");

  const authorKeys = _.keys(authorBlogCounts);

  const mostBlogsAuthor = _.maxBy(
    authorKeys,
    (author) => authorBlogCounts[author]
  );

  console.log(
    `Author with most blogs: ${mostBlogsAuthor}, Number of blogs: ${authorBlogCounts[mostBlogsAuthor]}`
  );

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogCounts[mostBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((acumulado, blog) => {
    acumulado[blog.author] = (acumulado[blog.author] || 0) + blog.likes; // si no tiene se pone a 0
    return acumulado;
  }, {}); // empieza en vacío y va sumando los likes segun el autor

  const mostLikesAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author]);

  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor]
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
