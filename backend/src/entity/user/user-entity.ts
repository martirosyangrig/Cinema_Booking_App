import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import {Booking} from "../booking/index"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fullName: string;
  
    @Column()
    password: string

    @Column()
    email: string

    @Column()
    admin: boolean
    // Add more fields as needed
  
    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];
}
