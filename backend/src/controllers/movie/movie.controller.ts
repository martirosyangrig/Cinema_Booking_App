import { NextFunction, Request, Response } from "express";
import { ICreateMovie } from "../../interfaces/movie-types";
import { MovieService } from "../../services/movie/movie.service";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";

export class MovieController {
    static async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const createDto: ICreateMovie = req.body;
            if (!createDto.roomId || !createDto.title)
                throw new Error("RoomId and Title is required");

            const newMovie = await MovieService.createMovie(createDto);

            res.status(HttpStatusCodes.OK).json(newMovie);
        } catch (error) {
            next(error);
        }
    }

    static async getMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId = req.params.roomId;
            if (!roomId) throw new Error("RoomId is required");

            const roomWithMovies = await MovieService.getMovies(roomId);

            res.status(HttpStatusCodes.OK).json(roomWithMovies);
        } catch (error) {
            next(error);
        }
    }

    static async getMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId = req.params.movieId;
            if (!movieId) throw new Error("MovieId is required");

            const movie = await MovieService.getMovie(movieId);

            res.status(HttpStatusCodes.OK).json(movie);
        } catch (error) {
            next(error);
        }
    }
}
