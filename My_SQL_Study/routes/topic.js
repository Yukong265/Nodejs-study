const db = require('./db');
const template = require('../lib/template');
module.exports = {
    Home: (request, response) => {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(topics);
            var control = `<h2>${title}</h2>${description}`;
            var body = `<a href="/create">create</a>`;
            var html = template.HTML(title, list, control, body);
            response.send(html);
        });
    }, Page: (filteredId, request, response) => {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            if (error) {
                throw error;
            }
            db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=${filteredId}`, function (error2, topic) {
                if (error2) {
                    throw error;
                } else {
                    var title = topic[0].title;
                    var description = topic[0].description;
                    var list = template.list(topics);
                    var html = template.HTML(title, list,
                        `<h2>${title}</h2>
                        <h5>By ${topic[0].name}</h5>
                        ${description}`,
                        ` <a href="/create">create</a>
                        <a href="/update/${topic[0].id}">update</a>
                        <form action="/delete_process" method="post">
                          <input type="hidden" name="id" value="${topic[0].id}">
                          <input type="submit" value="delete">
                        </form>`
                    );
                    response.send(html);
                }
            })
        })
    }, Create: (request, response) => {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            db.query('SELECT * FROM author', function (error2, authors) {
                if (error) {
                    throw error;
                } else {
                    var title = 'WEB - create';
                    var list = template.list(topics);
                    var tag = template.select(authors);
                    var html = template.HTML(title, list, `
              <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                ${tag}        
                <p>
                  <input type="submit">
                </p>
              </form>
            `, '');
                    response.send(html);
                }
            })
        })
    }, Create_process: (request, response) => {
        var post = request.body;
        db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`, [post.title, post.description, 1],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: encodeURI(`/page/${result.insertId}`) });
                response.end();
            });
    }, Update: (filteredId, request, response) => {
        console.log(filteredId);
        db.query('SELECT * FROM topic', function (error, topics) {
            if (error) {
                throw error;
            }
            db.query(`SELECT * FROM topic WHERE id=${filteredId}`, function (error2, topic) {
                var title = topic[0].title;
                var description = topic[0].description;
                var list = template.list(topics);
                db.query('SELECT * FROM author', function (error3, author) {
                    var tag = template.select(author);
                    var html = template.HTML(title, list,
                        `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${filteredId}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                ${tag}
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
            `<a href="/create">create</a> <a href="/update/${filteredId}">update</a>`
                    );
                    response.send(html);
                })
            })
        })
    }
}