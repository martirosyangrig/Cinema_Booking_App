import { NextFunction, Request, Response } from "express";
import { ICreateRoom } from "../../interfaces/room-types";
import { RoomService } from "../../services/room/room.service";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";

export class RoomController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ICreateRoom = req.body;
            if (!data.name) throw new Error("Room name is required");

            const newRoom = await RoomService.create(data.name);

            res.status(HttpStatusCodes.OK).json(newRoom);
        } catch (error) {
            next(error);
        }
    }

    static async getRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const rooms = await RoomService.getRooms();

            res.status(HttpStatusCodes.OK).json(rooms);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId = req.params.id;
            if (!roomId) throw new Error("RoomId is required");

            const succeded = await RoomService.delete(roomId);

            res.status(HttpStatusCodes.OK).json({ succeded });
        } catch (error) {
            next(error);
        }
    }
}
