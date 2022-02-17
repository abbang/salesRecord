const Server = require('./services/server');
const app = Server.app();
const bodyParser = require('body-parser');
const express = require('express');
const port = (process.env.PORT || 3001);
const path = require('path');
//const cookieParser = require('cookie-parser');
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const exphbs = require('express-handlebars');
const indexRoute = require("./routes/routeIndex");
MomentHandler.registerHelpers(Handlebars);

app.use((req, res, next) => {
    next();
});

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  }
  
  app.use(allowCrossDomain)

app.use(express.static(path.join(__dirname, '../public')));
//app.use(cookieParser('keyboard cat'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({
    layoutsDir: __dirname + './../views',
    defaultLayout: null
    // partialsDir: __dirname + '/views/partials'
  }));
  app.set('views', __dirname + './../views');
  app.set('view engine', 'handlebars');

app.use('/sales', indexRoute);

app.listen(port)

