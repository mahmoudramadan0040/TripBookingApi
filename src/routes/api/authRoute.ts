import { Router } from 'express'
import AuthController from '../../controllers/AuthController'

// ------------- Auth Router -----------------//
const routes = Router()
const auth = new AuthController()
// google routes

routes.get('/google', auth.auth_using_google)
routes.get('/google/callback', auth.google_callback)
routes.get('/failure', auth.google_auth_failure)
routes.get('/logout', auth.logout)

// auth local
routes.post('/register',auth.register)
routes.post('/verify-email',auth.verifyEmail)

export default routes
