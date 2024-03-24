import { AppDataSource } from "../configs/postgres";
import { Booking } from "../entity/booking";
import { Movie } from "../entity/movie/movie-entity";
import { Room } from "../entity/room/room-entity";
import { User } from "../entity/user/user-entity";

export const userRepository = AppDataSource.getRepository(User);
export const movieRepository = AppDataSource.getRepository(Movie);
export const roomRepository = AppDataSource.getRepository(Room);
export const bookSeatRepository = AppDataSource.getRepository(Booking);
