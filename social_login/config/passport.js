const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

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
                clientID: 'b0a94bd768e6198f4c21e7a2b76520b7',
                callbackURL: '/auth/login/kakao/callback',
            }, async (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(refreshToken);
                done(null, profile)
            }
        )
    )
}