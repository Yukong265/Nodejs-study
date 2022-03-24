const express = require("express");
const http = require("http");
const configureSession = require("./config/session");
require("dotenv").config();
const configurePassport = require("./config/passport");
const authRouter = require("./routes/auth");
const passport = require('passport')

const app = express()

configurePassport(app);
configureSession(app);


app.use(passport.initialize())
app.use(passport.session())



const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  if (req.user) {
    res.send(`
        <h3>Login Success</h3>
        <a href="/auth/logout">Logout</a>
        <p>
            ${JSON.stringify(req.user, null, 2)}
        </p>
        `);
  } else {
    res.send(`<h3>Node Passport Social Login</h3>
      <a href="/auth/login/google">Login with Google+</a>
      <a href="/auth/login/facebook">Login with Facebook</a>
      <a href="/auth/login/naver">Login with Naver</a>
      <a href="/auth/login/kakao">Login with Kakao</a>
`);
  }
});

app.use((err, req,res, next)=>{
  if(err) console.log(err);
  res.send(err);
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
