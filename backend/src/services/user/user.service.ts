import { IBookSeatDto } from "../../interfaces/user-types";
import {
    bookSeatRepository,
    movieRepository,
    userRepository,
} from "../../repositories";
import { MovieService } from "../movie/movie.service";

export class UserService {
    static async bookSeat(bookSeatDto: IBookSeatDto, userId: number) {
        const user = await userRepository.findOne({ where: { id: userId } });
        const movie = await movieRepository.findOne({
            where: { id: +bookSeatDto.movieId },
        });

        if (!user || !movie) throw new Error("Couldnt find user or movie");

        const newBooking = bookSeatRepository.create({
            user,
            movie,
            seatNumber: bookSeatDto.seatNumber,
        });

        await bookSeatRepository.save(newBooking);

        const movieWithBookedSeats = await MovieService.getMovie(
            bookSeatDto.movieId
        );

        return movieWithBookedSeats;
    }
}
