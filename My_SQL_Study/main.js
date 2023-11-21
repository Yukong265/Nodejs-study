var express = require('express')
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var template = require('./lib/template.js');
const db = require('./routes/db');
const topic = require('./routes/topic');
db.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());


//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (request, response) {
  topic.Home(request, response);
});

app.get('/page/:pageId', function (request, response, next) {
  var filteredId = path.parse(request.params.pageId).base;
  topic.Page(filteredId, request, response);
});

app.get(`/create`, function (request, response) {
  topic.Create(request, response);
});

app.post('/create_process', function (request, response) {
  topic.Create_process(request, response);
});

app.get('/update/:pageId', function (request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  console.log(filteredId);
  topic.Update(filteredId, request, response);
});

app.post('/update_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  console.log(title, description, id);
  db.query(`UPDATE topic SET title="${title}", description="${description}" WHERE id=${id}`, function (error, result) {
    response.redirect(`/page/${id}`);
  })
});

app.post('/delete_process', function (request, response) {
  var post = request.body;
  db.query(`DELETE FROM topic WHERE id=${post.id}`, function (error, result) {
    if (error) {
      throw error;
    }
    response.redirect('/');
  })
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 