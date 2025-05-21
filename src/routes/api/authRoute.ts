import { Router } from 'express'
import AuthController from '../../controllers/AuthController'

// ------------- Auth Router -----------------//
const routes = Router()
const auth = new AuthController()

routes.get('/google', auth.auth_using_google)
routes.get('/google/callback', auth.google_callback)
routes.get('/failure', auth.google_auth_failure)
routes.get('/logout', auth.logout)

export default routes
