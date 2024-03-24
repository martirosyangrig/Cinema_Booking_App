import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.message) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        });
    }
};
