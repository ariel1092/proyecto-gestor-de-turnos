import { NextFunction, Request, Response, Router } from "express";
import appoinmentController from "../controllers/appoinmentController";

const appoinmentRouter: Router = Router()


appoinmentRouter.get("/", (req: Request, res: Response, next:NextFunction)=>{
    appoinmentController.getAppoinmentController(req,res,next)
})

appoinmentRouter.get("/:id", (req: Request<{ id: string }>, res: Response, next:NextFunction)=>{
    appoinmentController.getAppoinmentByIdController(req,res,next)

})

appoinmentRouter.post("/schedule", (req: Request, res: Response, next:NextFunction)=>{
    appoinmentController.registerAppoinmentController(req,res,next)
})


appoinmentRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response, next:NextFunction)=> {
    appoinmentController.cancelAppoinmentController(req,res,next)
})


export default appoinmentRouter