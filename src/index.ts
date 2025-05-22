import express from 'express'
import morgan from 'morgan'
import routes from './routes'
import { errorHandler } from './middlewares/ErrorHandler'
import config from './config/config'
import './config/passport'
import passport from 'passport'
import session from 'express-session'

const app = express()
const port = config.port || 3000

// use the session middleware
app.use(
  session({
    secret: config.express_session_secret!, // session secret
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(morgan('common'))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.get("/api/protected",(req,res,next)=>{
  res.send("<p>hello protected</p>")
})
app.use('/api', routes)

// error handler middleware

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server start listing on port ${port}`)
})
export default app
