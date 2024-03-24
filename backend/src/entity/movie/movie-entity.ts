import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "../room/room-entity";
import { Booking } from "../booking";


@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;


    @ManyToOne(() => Room, room => room.movies)
    @JoinColumn({ name: "room_id" })
    room: Room;
 
    @OneToMany(() => Booking, booking => booking.movie)
    bookings: Booking[];
}
