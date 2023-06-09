const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// Loading the config file 
dotenv.config({path: './config/config.env'})

// Passport Config
require('./config/passport')(passport)

// 
connectDB()

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
// Method Override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))


if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// Handlebars helpers
const {formatDate, stripTags, truncate,editIcon,select} = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs.engine({helpers:{formatDate,
                                            stripTags,
                                            truncate,
                                            editIcon,
                                            select},extname:'.hbs'})); // Syntax has changed since the tutorial. This was exphbs without engine, gives error "exphbs is not a function"
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
  }))
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global Variable
app.use(function(req, res, next){
  res.locals.user = req.user || null
  next()
})
// Static Folder
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
