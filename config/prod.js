require('dotenv').config()
process.env.USER_NAME
process.env.USER_KEY


module.exports = {
  'dbURL': `mongodb+srv://${USER_NAME}:${USER_KEY}@cluster0.oij4ow0.mongodb.net/?retryWrites=true&w=majority`,
}
