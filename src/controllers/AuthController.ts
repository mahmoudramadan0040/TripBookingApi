import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
class AuthController {
  // ---------------------- Auth Using Google & Passport ------------------------------ //
  //   google auth
  async auth_using_google(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('herer')
      return passport.authenticate('google', { scope: ['email', 'profile'] })(
        req,
        res,
        next,
      )
    } catch (error) {
      return next(error)
    }
  }

  //   google callback
  async google_callback(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.user)
      passport.authenticate('google', {
        successRedirect: 'api/protected',
        failureRedirect: 'api/auth/failure',
      })(req, res, next)
    } catch (error) {
      return next(error)
    }
  }

  //   google auth failure
  async google_auth_failure(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('something went wrong !')
    } catch (error) {
      return next(error)
    }
  }

  // logout

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.logout((err: any) => {
        if (err) return next(err)

        req.session.destroy((err) => {
          if (err) return next(err)
          res.clearCookie('connect.sid')
          res.redirect('/')
        })
      })
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController
