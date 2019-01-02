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
// app.use(express.static('./dist'))


// const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/nyt-scraper-react'
// mongoose.connect(databaseUrl, { useNewUrlParser: true })

const nytSearchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=${process.env.NYT_API_KEY}`



// route to perform a NYT article search
app.post('/api/search/', (req, res) => {
  const { begin, end, term } = req.body
  const queryURL = `${nytSearchUrl}&q=${term}&begin_date=${begin}&end_date=${end}`
  axios.get(queryURL)
    .then(({ data }) => {
      const formatted = data.response.docs.map(doc => {
        return {
          title: doc.headline.main,
          author: doc.byline.original ? doc.byline.original.slice(3) : 'Anonymous',
          description: doc.snippet,
          link: doc.web_url,
          publishedDate: doc.pub_date.slice(0, 10),
        }
      })
      res.json(formatted)
    })
    .catch(x => console.log(x))
})


// route to save an article to the database
// app.post('/api/save/', (req, res) => {
//   dbArticle.create(req.body)
//     .then(saved => {
//       res.json(saved)
//     })
// })

// app.post('/api/test/', (req, res) => {
//   console.log('test received')
//   res.send('test success')
// })


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);