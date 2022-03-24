const session = require('express-session');

module.exports = (app) => {
    app.use(
        session({
            secret: 'SECRET',
            cookie: { maxAge: 60 * 60 * 1000 },
            resave: false,
            saveUninitialized: true,
        })
    )
}