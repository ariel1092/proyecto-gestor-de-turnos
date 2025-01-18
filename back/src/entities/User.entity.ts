import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,

} from "typeorm";
import { Credential } from "./Credentials";
import { Appoinment } from "./AppoinmentsEntity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  nDni: number;

  @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
  @JoinColumn()  // Aquí en `User` como propietario de la relación
  credentials: Credential;

@OneToMany(()=> Appoinment, (appoinment) => appoinment.user , {nullable:false})
appoinments:Appoinment[]


}
