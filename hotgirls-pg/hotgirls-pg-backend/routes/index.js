const users = require('./users')
const posts = require('./posts')
const uploads = require('./uploads')
module.exports = app => {
  app.use('/users', users)
  app.use('/posts', posts)
  app.use('/uploads', uploads)
}