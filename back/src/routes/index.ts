import {Router} from 'express'
import userRoute from "./userRoute"
import appoinmentRouter from './appoinmentsRoutes'
const router: Router = Router()

router.get("/", (req, res) => {
    res.status(200).send("Bienvenido al backend del proyecto Gestor de Turnos.");
});

router.use("/users", userRoute)
router.use("/appoinments", appoinmentRouter)

export default router