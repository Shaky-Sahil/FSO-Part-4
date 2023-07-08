const dummy = (blogs) => 1;
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, b) => sum += b.likes, 0);
  return total;
};
module.exports = {
  dummy,
  totalLikes,
};
