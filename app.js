const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const { response } = require('express');
const { request } = require('http');

const app = express();

//HTML dinamico
app.set('view-engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //habilita ajax
app.use(cookieParser());
app.use(session({
    secret: 'ahdfjnfnruenfun4u3un2indindds22345',
    resave: false,
    saveUninitialized: false
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

app.use((request, response, next) => {
    //aqui van las cookies
    next();
});

app.use((request, response, next) => {
    response.status(404);
    response.sendFile(path.join(__dirname,'views','error html'));
});
app.listen(3000);