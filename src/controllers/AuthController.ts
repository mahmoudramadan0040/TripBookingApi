import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { sendVerificationCode, sendResetPasswordLink } from '../utils/email'
import { generateUniqueCode } from '../utils/generateCode'
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
  login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) return next(err)
      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || 'Login failed' })
      }

      req.logIn(user, (err) => {
        if (err) return next(err)
        return res.status(200).json({ message: 'Login successful', user })
      })
    })(req, res, next)
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, username } = req.body

      const existing = await User.findOne({ where: { email } })
      if (existing) res.status(400).json({ message: 'Email already exists' })

      const verificationCode = generateUniqueCode(email)
      const newUser = await User.create({
        email,
        username,
        password,
        verificationCode,
      })
      await newUser.save()
      await sendVerificationCode(email, verificationCode)

      res.status(201).json({
        message: 'User registered. Check your email to verify your account.',
      })
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }

  sendResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) res.status(404).json({ message: 'User not found' })
      else {
        const verificationCode = generateUniqueCode(email)
        user.verificationCode = verificationCode
        await user.save()
        await sendResetPasswordLink(email, verificationCode)
        res.status(200).json({ message: 'Reset password link sent to email' })
      }
    } catch (err) {
      next(err)
    }
  }
  VerifyPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) res.status(404).json({ message: 'User not found' })
      else if (user.verificationCode == code) {
        res.status(200).json({ message: 'link is valid successful !' })
      } else {
        res.status(400).json({ message: 'link is not valid or expire !' })
      }
    } catch (err) {
      next(err)
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
        else {
          user.isVerified = true
          await user.save()
          res.status(200).json({ message: 'Email verified successfully' })
        }
      }
    } catch (err) {
      next(err)
    }
  }
  SendCodeByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        res.status(404).json({ message: 'User not found' })
      } else {
        if (user.isVerified)
          res.status(400).json({ message: 'User already verified' })
        else {
          const verificationCode = generateUniqueCode(email)
          user.verificationCode = verificationCode
          await user.save()
          await sendVerificationCode(email, verificationCode)
        }
        res.status(200).json({ message: 'Send New Verification Code ! ' })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default AuthController
