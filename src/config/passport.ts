import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from '../config/config'
import passport, { Profile } from 'passport'
import { Request } from 'express'

// configuration of passort google strategy 
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id!,
      clientSecret: config.gooogle_client_secret!,
      callbackURL: config.google_callback_url!,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      console.log(profile)
      return done(null, profile)
    },
  ),
)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user!)
})
