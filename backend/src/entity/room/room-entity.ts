import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Movie } from "../movie/movie-entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    // Define many-to-many relationship with Movie
    @OneToMany(() => Movie, movie => movie.room,)
    movies: Movie[];
}
