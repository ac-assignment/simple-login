import express from 'express'
import cookieParser from 'cookie-parser'
import { v1 as uuidV1 } from 'uuid'
import hbs from './config/handlebars.js'
import users from './models/user.js'

const app = express()

const PORT = process.env.PORT || 3000
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

let errorTokens = []

app.get('/', (req, res) => {
  const { id } = req.cookies
  console.log(errorTokens)
  if (errorTokens.includes(id)) {
    errorTokens = errorTokens.filter(t => t !== id)
    res.render('index', { hasError: true })
  } else {
    res.render('index')
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  
  const user = users.find((user) => {
    return user.email === email && user.password === password
  })
  if (user) {
    res.render('success', { user })
  } else {
    const token = uuidV1()
    errorTokens.push(token)
    res.cookie('id', token).redirect('/')
  }
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})