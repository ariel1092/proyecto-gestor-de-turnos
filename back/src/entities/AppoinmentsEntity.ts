import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../interfaces/AppoinmentInterface";
import { User } from "./User.entity";

@Entity("appoinments")
export class Appoinment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "date", nullable: false })
  date: Date;
  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;
  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    default: Status.active,
  })
  status: Status;
  
  @ManyToOne(() => User, user => user.appoinments, { nullable: false })
  @JoinColumn()
  user: User;
}
