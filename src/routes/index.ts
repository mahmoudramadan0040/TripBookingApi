import {Router} from 'express';
import authRoute from "./api/authRoute";
import transportRoute from "./api/trasnportRoute"
import tourRoute from "./api/tourRoute"
const routes =Router();

routes.use("/tours",tourRoute);
routes.use("/transport",transportRoute);
routes.use("/auth",authRoute);
export default routes;