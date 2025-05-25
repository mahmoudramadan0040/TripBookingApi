import {Router} from 'express';
import authRoute from "./api/authRoute";
import transportRoute from "./api/trasnportRoute"
const routes =Router();

routes.use("/transport",transportRoute);
routes.use("/auth",authRoute);
export default routes;