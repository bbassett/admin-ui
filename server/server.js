require('dotenv').config()
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
const request = require('request')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/login', (req, res) => {
  res.send('login here');
});

app.get('/logout', (req, res) => {
  console.log('here');
  res.clearCookie('access_token')
  res.send('logged out<br /><a href="/login">Login</a>')
});

app.post('/login', (req, res) => {
  request.post(
    {
      url: api('/oauth/password'),
      form: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        email: req.body.email,
        password: req.body.password,
      },
    },
    function(err, result, body) {
      if (err) {
        return res.send(err)
      }

      res.cookie('access_token', JSON.parse(body)['access_token'], {
        domain: process.env.COOKIE_DOMAIN,
      })
      res.redirect('/')
    },
  )
});

app.use(express.static(path.join(__dirname, '../client/build')));

// any routes not picked up by the server api will be handled by the react router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'))
});

app.set('port', (process.env.PORT || 3000))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
