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

let userTokens = []
let errorLogins = []

app.get('/', (req, res) => {
  const { errorId, token } = req.cookies
  
  const errorLogin = errorLogins.find(item => item.errorId === errorId)
  if (errorLogin) {
    errorLogins = errorLogins.filter(item => item.errorId !== errorId)
    res.clearCookie('errorId')
    return res.render('index', { hasError: true, email: errorLogin.email })
  }
  
  const userToken = userTokens.find(item => item.token === token) 
  if (userToken) {
    const user = users.find(user => user.email === userToken.email)
    return res.render('success', { user })
  }
  
  return res.render('index')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  
  const user = users.find(user => {
    return user.email === email && user.password === password
  })
  if (user) {
    const token = uuidV1()
    userTokens.push({ token, email })
    res.cookie('token', token)
    return res.render('success', { user })
  } else {
    const errorId = uuidV1()
    errorLogins.push({ errorId, email })
    return res.cookie('errorId', errorId).redirect('/')
  }
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})