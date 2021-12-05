import express from 'express'
import hbs from './config/handlebars.js'
import users from './models/user.js'

const app = express()

const PORT = process.env.PORT || 3000
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(users)
  
  res.render('success')
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})