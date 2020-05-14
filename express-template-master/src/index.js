const express = require('express'),
    app = express(),
    ejs = require('ejs'),
    { resolve } = require('path');

const config = require('./config/database');
const sequelize = require('./database/mysql');

const requireContext = require('require-context-async')

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.set('views', resolve(__dirname, '../views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

// tables
const tablePath = resolve(__dirname, './tables');
// controller
const routerPath = resolve(__dirname, './controller');
// middleware
const middlePath = resolve(__dirname, './middleware');

requireContext(tablePath, true, /\.js$/, path => {
    sequelize.define(...require(path)).sync();

})
requireContext(middlePath, true, /\.js$/, (path) => {
    require(path)(app);
});

requireContext(routerPath, true, /\.js$/, (path) => {
    let expose = require(path);

    if(expose.name == 'router'){
        app.use(expose)
    }
    
});


module.exports = app;
