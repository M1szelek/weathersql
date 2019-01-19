require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cron = require('cron');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = require('./models');
const DarkSky = require('dark-sky');
const forecast = new DarkSky(process.env.DARKSKY_KEY);

var CronJob = cron.CronJob;
new CronJob('*/2 * * * *', () => {
    forecast
        .latitude('49.7999')
        .longitude('18.7878')
        .exclude('minutely,hourly,daily,alerts,flags')
        .units('si')
        .get()
        .then(res => {
            if(res.currently) {
                db.Snapshot
                    .create(res.currently)
                    .then(() => {
                        console.log("Weather saved.")
                    })
                    .catch(() => {
                        console.log("Something went wrong. Weather not saved.")
                    });
            }
        })
        .catch(err => {
            console.log(err)
        });
}, null, true);

const http = require('http');

new CronJob('*/5 * * * *', function () {
    console.log("pinger in action");
    http.get(process.env.APP_URI);
}, null, true);







module.exports = app;
