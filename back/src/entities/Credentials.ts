import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
   
  } from "typeorm";
  import { User } from "./User.entity";
  
  @Entity("credentials")
  export class Credential {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

  
    @OneToOne(() => User, (user) => user.credentials)
    user: User;
  
  
  }
  