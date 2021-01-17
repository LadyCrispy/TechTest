var express = require('express');
var createError = require('http-errors');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require('./routes/')(app);
app.use('/static', express.static(__dirname + '/public/assets'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(404).send({
    "code": 404,
    "message": "Route does not exist"
  });
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`)
})

module.exports = app;
