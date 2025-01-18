import {Router} from 'express'
import userRoute from "./userRoute"
import appoinmentRouter from './appoinmentsRoutes'
const router: Router = Router()


router.use("/users", userRoute)
router.use("/appoinments", appoinmentRouter)

export default router