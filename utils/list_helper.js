const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, b) => sum += b.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let maxIndex=0;
  blogs.forEach((b,i) => {
    if (b.likes > maxLikes) {
      maxLikes = b.likes;
      maxIndex = i;
    }
  });
  return blogs[maxIndex];
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
