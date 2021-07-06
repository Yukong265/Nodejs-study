var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression');
var template = require('./lib/template.js');
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rlawjdtjs0',
  database: 'workbenchs'
});

db.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});


//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (request, response) {
  /*var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
    <h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
    `,
    `<a href="/create">create</a>`
  ); 
  response.send(html);*/
  db.query(`SELECT * FROM topic`, function (error, topics) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(topics);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="images/coding.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
      `<a href="/create/${topics[0].id}">create</a>`
    );
    response.send(html);
  })
});

app.get('/page/:pageId', function (request, response, next) {
  var filteredId = path.parse(request.params.pageId).base;
  console.log(filteredId);
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=${filteredId}`, function (error2, topic) {
      if (error2) {
        throw error;
      } else {
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          ` <a href="/create/:pageId">create</a>
                <a href="/update/${topic[filteredId].id}">update</a>
                <form action="/delete_process" method="post">
                  <input type="hidden" name="id" value="${topic[filteredId].id}">
                  <input type="submit" value="delete">
                </form>`
        );
        response.send(html);
      }
    })
  })
});

app.get('/create/:pageId', function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    } else {
      var title = 'WEB - create';
      var list = template.list(topics);
      var html = template.HTML(title, list, `
    <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
      response.send(html);
    }
  })
});

app.post('/create_process', function (request, response) {
  var post = request.body;
  db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`, [post.title, post.description], 1),
    function (error, result) {
      if (error) {
        throw error;
      }
      response.send(302, { Location: encodeURI(`/page/${result.insertId}`) });
    }
});

app.get('/update/:pageId', function (request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/create">create</a> <a href="/update/${title}">update</a>`
    );
    response.send(html);
  });
});

app.post('/update_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function (error) {
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      response.redirect(`/page/${title}`);
    })
  });
});


app.post('/delete_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function (error) {
    response.redirect('/');
  });
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});