import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { sendVerificationCode } from '../utils/email'
import { generateCode } from '../utils/generateCode'
import User from '../models/user.model'
class AuthController {
  // ---------------------- Auth Using Google & Passport ------------------------------ //
  //   google auth
  async auth_using_google(req: Request, res: Response, next: NextFunction) {
    try {
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
        successRedirect: '/api/protected',
        failureRedirect: '/api/auth/failure',
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
  // traditional register and login
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      const existing = await User.findOne({ where: { email } })
      if (existing) res.status(400).json({ message: 'Email already exists' })

      const verificationCode = generateCode()
      const newUser = await User.create({ email, password, verificationCode })

      await sendVerificationCode(email, verificationCode)

      res.status(201).json({
        message: 'User registered. Check your email to verify your account.',
      })
    } catch (err) {
      console.log(err);
      return next(err)
    }
  }
  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        if (user.isVerified)
          res.status(400).json({ message: 'User already verified' })
        if (user.verificationCode !== code)
          res.status(400).json({ message: 'Invalid verification code' })

        user.isVerified = true
        user.verificationCode = code
        await user.save()

        res.status(200).json({ message: 'Email verified successfully' })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default AuthController
