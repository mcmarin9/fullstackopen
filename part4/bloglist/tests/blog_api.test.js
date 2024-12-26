const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');
const Blog = require('../models/blogs');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property of blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogs = response.body;
  blogs.forEach(blog => {
    assert.strictEqual(typeof blog.id, 'string');
    assert.strictEqual(blog._id, undefined);
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Who I am?',
    author: 'Me',
    url: 'www.itsme.com',
    likes: 34
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  assert(titles.includes("Who I am?"));
});

test.only('a blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Who I am?',
    author: 'Me',
    url: 'www.itsme.com'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const savedBlog = response.body;
  assert.strictEqual(savedBlog.likes, 0);
});

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Me',
    likes: 35
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  const title = blogsAtEnd.map(r => r.title)
  assert(!title.includes(blogToDelete.title))
})

test.only('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlogData = {
    title: 'Updated Title',
    author: 'Updated Author',
    url: 'http://updatedurl.com',
    likes: 100
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const updatedBlog = response.body;
  assert.strictEqual(updatedBlog.title, updatedBlogData.title);
  assert.strictEqual(updatedBlog.author, updatedBlogData.author);
  assert.strictEqual(updatedBlog.url, updatedBlogData.url);
  assert.strictEqual(updatedBlog.likes, updatedBlogData.likes);
});

after(async () => {
  await mongoose.connection.close();
});