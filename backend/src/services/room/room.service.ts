import { roomRepository } from "../../repositories";

export class RoomService {
    static async create(name: string) {
        const room = await roomRepository.findOne({ where: { name } });
        if (room) throw new Error("Name is booked");

        const newRoom = roomRepository.create({
            name,
            movies: [],
        });
        await roomRepository.save(newRoom);

        return newRoom;
    }

    static async getRooms() {
        const rooms = await roomRepository.find();

        return rooms;
    }

    static async delete(roomId: string) {
        const deletedRoom = await roomRepository.delete({ id: +roomId });

        if (!deletedRoom) throw new Error("Room not found");

        return true;
    }
}
