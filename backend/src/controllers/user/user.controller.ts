import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import { IBookSeatDto } from "../../interfaces/user-types";
import { UserService } from "../../services/user/user.service";

export class UserControoler {
    static async bookSeat(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            const bookSeatDto: IBookSeatDto = req.body;
            if (!userId || !bookSeatDto.movieId || !bookSeatDto.seatNumber)
                throw new Error("UserId, movieId and seatNumber is required");

            const movieWithBookedSeats = await UserService.bookSeat(
                bookSeatDto,
                userId
            );

            res.status(HttpStatusCodes.OK).json({
                succeded: true,
                movieWithBookedSeats,
            });
        } catch (error) {
            next(error);
        }
    }
}
