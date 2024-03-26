import { IRoomData } from "../Rooms/types";

export interface IMovie {
    id: number;
    title: string

}

export interface ICreatedMovieData {
    room: IRoomData;
    id: number;
    title: number
}