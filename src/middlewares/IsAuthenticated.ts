
import { Request,Response,NextFunction } from "express"
const IsAuthenticated =(req:Request,res:Response,next:NextFunction) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).send('Unauthorized')
}
