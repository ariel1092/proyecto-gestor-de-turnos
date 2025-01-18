/* eslint-disable @typescript-eslint/no-unused-vars */
 import express, {Application, NextFunction, Request, Response} from "express"
 import morgan from "morgan"
 import cors from  "cors"
import router from "./routes"
import { ErrorResponse, PostgresError } from "./interfaces/ErrorInterface"
 
//Crear la aplicacion Express
 const server: Application = express()

//Middlewares
server.use(express.json())
server.use(morgan("dev"))
server.use(cors())

//Rutas
server.use(router)


//Middlware para manejar rutas que no existen
server.use((err: unknown,req:Request,res:Response,next:NextFunction)=>{

const error = err as PostgresError

const errorMessage: ErrorResponse = {
message: "Error del servidor",
details: err instanceof Error ? error.detail ? error.detail : err.message : "Error desconocido",
code: error.code,
}
if(error.code === 404) 
 res.status(404)
.json({message: errorMessage.message, details: errorMessage.details})


else res.status(400).json(errorMessage)
})

 export default server