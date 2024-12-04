const { test, describe } = require('node:test');
const assert = require('node:assert');

const mostBlogs = require('../utils/list_helper').mostBlogs;

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Blog',
      author: 'Jenny Doe',
      url: 'https://example.com/another-blog',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Yet Another Blog',
      author: 'Jenny Doe',
      url: 'https://example.com/yet-another-blog',
      likes: 15,
      __v: 0
    }
  ];

  const emptyList = [];

  test('when list has only one blog, equals the author of that blog', () => {
    const result = mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('when list has multiple blogs, equals the author with most blogs', () => {
    const result = mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: 'Jenny Doe', blogs: 2 });
  });

  test('when list is empty, equals null', () => {
    const result = mostBlogs(emptyList);
    assert.strictEqual(result, null);
  });
});