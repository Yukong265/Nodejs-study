const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const { User, Item } = require("../models");
const salt = crypto.randomBytes(128).toString('base64');


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
    console.log(hash)
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "not sign up user",
      });
    }
    if (hash !== user.hashed_password) {
      return res.status(401).json({
        code:401,
        message: 'Uncorrect password'
      })
    }
    if(!username || !password) {
      return res.status(400).json({
        code:400,
        message:'Bad Request',
      })
    }
    const token = jwt.sign(
      {
        username: user.username,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "24h",
        issuer: "Admin",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { id: username } });
    if (exUser) {
      return res.sendStatus(409).json({
        code:409,
        message: '이미 있는 유저입니다',
      })
    }
    const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
    await User.create({
      username,
      hashed_password: hash,
    });
    return res.json({
      message:'회원가입 성공'
    })
  } catch (error) {
    return res.status(500).json({
      code:500,
      message: error.message
    })
  }
});



module.exports = router;