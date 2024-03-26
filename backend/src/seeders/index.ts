import { Room } from "../entity/room/room-entity";
import { movieRepository } from "../repositories";
import { roomRepository } from "../repositories";

const roomData = [{ name: "FirstRoom" }, { name: "secondRoom" }];

const movieData = [
    { title: "firstMovie", roomId: 1 },
    { title: "secondMovie", roomId: 1 },
    { title: "thirdMovie", roomId: 2 },
    { title: "forthMovie", roomId: 2 },
];

export const addMockData = async () => {
    try {
        const existedRooms = await roomRepository.find();

        if (!existedRooms.length) {
            const createdRooms: Room[] = await Promise.all(
                roomData.map(async (room) => {
                    return await roomRepository.save(room);
                })
            );

            const existedMovie = await movieRepository.find();

            if (!existedMovie.length) {
                await Promise.all(
                    movieData.map(async (movie) => {
                        const room = createdRooms.find(
                            (room) => room.id === movie.roomId
                        );
                        if (!room) {
                            throw new Error(
                                `Room with ID ${movie.roomId} not found.`
                            );
                        }
                        await movieRepository.save({
                            ...movie,
                            room: room,
                        });
                    })
                );
            }
        }
        console.log("Mock data added successfully.");
    } catch (error) {
        console.error("Error adding mock data:", error);
    }
};
