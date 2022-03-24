const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login/google', passport.authenticate('google', {scope: ['profile']}))
router.get(
    '/login/google/callback',
    passport.authenticate('google', {failureRedirect: '/auth/login'}),
    (req,res)=>{
        res.redirect('/') 
    }
)

router.get('/login/facebook', passport.authenticate('facebook', {scope: ['profile']}))
router.get(
  '/login/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/auth/login'}),
  (req,res)=>{
    res.redirect('/')
  }
)

router.get('/login/kakao', passport.authenticate('kakao'));
router.get(
  '/login/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/auth/login'
  }), (req,res) => {
    res.redirect('/');
  }
)

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      req.logout()
      res.redirect('/')
    })
  })

module.exports = router;