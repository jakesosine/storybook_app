const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')


// Loading the config file 
dotenv.config({path: './config/config.env'})

// 
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
// Handlebars
app.engine('.hbs', exphbs.engine({extname:'.hbs'})); // Syntax has changed since the tutorial. This was exphbs without engine, gives error "exphbs is not a function"
app.set('view engine', '.hbs');
  
// Routes
app.use('/',require('./routes/index'));

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
