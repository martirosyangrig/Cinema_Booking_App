import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import { verifyToken } from "../../utils/generateToken";

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const accessToken = req.header("Authorization")?.split(" ")[1];
        if (!accessToken) throw new Error("AccessToken not found");

        const decoded = verifyToken(accessToken);

        req.userId = decoded.id;
        req.isAdmin = decoded.admi;
        next();
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const verifyAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const isAdmin = req.isAdmin;

        if (!isAdmin) throw new Error("Access only for admins");

        next();
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
