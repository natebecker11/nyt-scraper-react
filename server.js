const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const axios = require('axios')
require('dotenv').config()

const dbArticle = require('./db/Article')

const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./dist'))


const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/nyt-scraper-react'
mongoose.connect(databaseUrl, { useNewUrlParser: true })



// route to perform a NYT article search
app.post('/api/search/', (req, res) => {
  axios.get()
})
