import Room from "@/components/RoomById";

interface IRoomByIdProps {
    params: {
        roomId: string;
    };
}
export default function RoomPage({ params }: IRoomByIdProps) {
    return <Room roomId={params.roomId} />;
}
