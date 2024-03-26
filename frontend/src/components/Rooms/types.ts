import { IMovie } from "../RoomById/types";

export interface IRoomData {
    id: number;
    name: string;
    movies?: IMovie[];
}