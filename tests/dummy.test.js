const listHelper = require('../utils/list_helper');
const helper = require('./test_helper')

const blogs = helper.initialBlogs

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when multiple blogs are passed total sum of likes are returned', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('when list is empty, returns 0', () => {
    const emptyBlog = [];
    const result = listHelper.totalLikes(emptyBlog);
    expect(result).toBe(0);
  });
});

describe('favouriteBlog', () => {
  test('return blog with maximum likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      
    });
  });
});

describe('mostBlogs', () => {
  test('given list of blogs, author with most blogs is', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
  test('when list has only one blog, returns author of that blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
});

describe('mostLikes', () => {
  test('given list of blogs, author with most likes is returned', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
  test('when list has only one blog, returns author and likes of that blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });
});
