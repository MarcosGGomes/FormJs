require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const mongoose = require('mongoose');
const {middlewareGlobal, csrfMiddleware, checkCsrfError} = require('./src/middleware/middleware');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('pronto')
})
.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const csrf = require('csurf');

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
  });
  app.use(sessionOptions);
  app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

app.on('pronto', () => {
app.listen(3000, () => {
    console.log('http://localhost:3000');
}); 
})

