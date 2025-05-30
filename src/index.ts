import express from 'express'
import morgan from 'morgan'
import routes from './routes'
import connect from './database'
import { errorHandler } from './middlewares/ErrorHandler'
import config from './config/config'
import './config/passport'
import passport from 'passport'
import session from 'express-session'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path'
import cors from "cors"

const app = express()
const port = config.port || 3000
app.use(cors());
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// use the session middleware
app.use(
  session({
    secret: config.express_session_secret!, // session secret
    resave: false,
    saveUninitialized: false,
  }),
)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/public', express.static("public"));
app.use(morgan('common'))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
// connect to database 
connect();
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
