import { NextFunction, Request, Response, Router } from "express";

import { UserCredentialDto,  UserRegisterDto } from "../dto/userDto";
import userControllers from "../controllers/userController";
// import { authenticateJWT } from "../middleware/authMiddleware";

const userRoute: Router = Router();

userRoute.get("/", (req: Request, res: Response, next:NextFunction) => {
  userControllers.getUserController(req, res, next);
}

);
userRoute.get("/:id", (req: Request<{ id: string }>, res: Response, next:NextFunction) => {
  userControllers.getUserByIdController(req, res,next);
});

userRoute.post(
  "/register",
  (req: Request<unknown, unknown, UserRegisterDto>, res: Response, next:NextFunction) => {
    userControllers.registerUserController(req, res,next);
  }
);

userRoute.post(
  "/login",
  (req: Request<unknown, unknown, UserCredentialDto>, res: Response, next:NextFunction) => {
    userControllers.loginUserController(req, res,next);
  }
);

export default userRoute;
