import { create } from 'express-handlebars'

const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
})

export default hbs