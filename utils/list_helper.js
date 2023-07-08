const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, b) => sum += b.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let maxIndex = 0;
  blogs.forEach((b, i) => {
    if (b.likes > maxLikes) {
      maxLikes = b.likes;
      maxIndex = i;
    }
  });
  return blogs[maxIndex];
};

const mostBlogs = (blogs) => {
  const arr = _.countBy(blogs, (b) => b.author);
  const name = _.maxBy(Object.keys(arr), (o) => {
    console.log(o);
    return arr[o];
  });
  console.log(name);
  return { author: name, blogs: arr[name] };
};

const mostLikes = (blogs) => {
  const map = {};
  blogs.forEach((b) => {
    if (!map[b.author]) {
      map[b.author] = 0;
    }
    map[b.author] += Number(b.likes);
  });
  const mostLiked = _.maxBy(Object.keys(map), (o) => map[o]);
  return { author: mostLiked, likes: map[mostLiked] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
