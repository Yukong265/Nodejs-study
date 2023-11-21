const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver');

module.exports = (app) => {
    passport.serializeUser((user, done)=>{
        done(null, user)
    })
    

    passport.deserializeUser((user, done)=>{
        done(null, user)
    })


    passport.use(
        new GoogleStrategy(
            {
                clientID:process.env['GOOGLE_CLIENT_ID'],
                clientSecret:process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: process.env['GOOGLE_CALLBACK']
            }, (accessToken, refreshToken, profile, done)=>{
                return done(null, profile)
            }
        )
      )

    passport.use(
        new FacebookStrategy(
            {
                clientID:process.env['FACEBOOK_CLIENT_ID'],
                clientSecret:process.env['FACEBOOK_CLIENT_SECRET'],
                callbackURL:process.env['FACEBOOK_CALLBACK']
            }, (accessToken, refreshToken, profile, cb) => {
                User.findOrCreate( { facebookId:profile.id }, (err,user)=>{
                    return cb;
                })
            }
        )
    )
    
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env['KAKAO_CLIENT_ID'],
                callbackURL: process.env['KAKAO_CALLBACK']
            }, async (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(refreshToken);
                done(null, profile)
            }
        )
    )

    passport.use(
        new NaverStrategy(
            {
                clientID: process.env['NAVER_CLIENT_ID'],
                clientSecret:process.env['NAVER_CLIENT_SECRET'],
                callbackURL:process.env['NAVER_CALLBACK']
            }, (accessToken, refreshToken, profile, done)=>{
                return done(null, profile)
            }
        )
    )
}