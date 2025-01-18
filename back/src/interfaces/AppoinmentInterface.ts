

export interface Appoinment {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: Status;
}

export enum Status {
  active = "active",
  cancelled = "cancelled",
}











// status: status actual del turno, que puede ser “active” o “cancelled”.
