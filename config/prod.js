require('dotenv').config()
const username = process.env.USER_NAME
const key = process.env.USER_KEY


module.exports = {
  'dbURL': `mongodb+srv://${username}:${key}@cluster0.oij4ow0.mongodb.net/?retryWrites=true&w=majority`,
}
