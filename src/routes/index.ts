import {Router} from 'express';
import authRoute from "./api/authRoute";
const routes =Router();

routes.use("/auth",authRoute);
export default routes;