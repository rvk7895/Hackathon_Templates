const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()

const users = require('./routes/api/users')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true }) //connects to the mongoDB

app.use(passport.initialize())
require('./config/Passport')(passport)
app.use('/api/users',users)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))