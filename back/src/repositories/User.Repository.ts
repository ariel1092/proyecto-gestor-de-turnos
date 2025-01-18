import { Repository } from "typeorm"
import { User } from "../entities/User.entity"
import { AppDataSource } from "../config/data-source"

export const UserRepository:Repository<User> = AppDataSource.getRepository(User)

