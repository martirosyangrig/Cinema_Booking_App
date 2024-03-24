import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from "../user/user-entity"
import { Movie } from '../movie/movie-entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, user => user.bookings)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Movie, movie => movie.bookings)
    @JoinColumn({ name: 'movieId' })
    movie: Movie;
  
    @Column()
    seatNumber: number;
}
