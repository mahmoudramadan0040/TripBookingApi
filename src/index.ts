import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares/ErrorHandler';
import config from './config/config';
const app = express();




const port = config.port || 3000;
app.use(morgan('common'));
app.use(express.json());
app.get("/",(req:express.Request,res:express.Response,next:express.NextFunction)=>{
     res.send("hello world");
})

app.use('/api',routes);

// error handler middleware 

app.use(errorHandler);



app.listen(port,()=>{
     console.log(`server start listing on port ${port}`);
})
export default app;



