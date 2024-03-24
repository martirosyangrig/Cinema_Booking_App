import { ICreateMovie } from "../../interfaces/movie-types";
import { movieRepository, roomRepository } from "../../repositories";

export class MovieService {
    static async createMovie(createDto: ICreateMovie) {
        const room = await roomRepository.findOne({
            where: { id: createDto.roomId },
        });
        if (!room) throw new Error("Room doesnt found");

        const newMovie = movieRepository.create({
            title: createDto.title,
            room,
        });
        await movieRepository.save(newMovie);

        return newMovie;
    }

    static async getMovies(roomId: string) {
        const roomWithMovies = await roomRepository.find({
            where: { id: +roomId },
            relations: { movies: true },
        });

        if (!roomWithMovies) throw new Error("Couldnt find movies");

        return roomWithMovies;
    }

    static async getMovie(movieId: string) {
        const movie = await movieRepository.findOne({
            where: { id: +movieId },
            relations: { bookings: {
                user: true
            },  },
        });
        if (!movie) throw new Error("Couldnt find the movie");

        return movie;
    }
}
