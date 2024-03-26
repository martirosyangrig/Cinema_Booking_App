"use client";

import { Api } from "@/services/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateModal from "./CreateModal";
import { IRoomData } from "./types";

import styles from "./rooms.module.scss";

export default function Rooms() {
    const [rooms, setRooms] = useState<IRoomData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getRooms = async () => {
            try {
                const { data }: { data: IRoomData[] } = await Api.get("/rooms");
                setRooms(data);
            } catch (error) {
                console.log(error);
            }
        };
        getRooms();
    }, []);

    const onCreateRoom = async (name: string) => {
        try {
            const { data }: { data: IRoomData } = await Api.post("/createRoom", {
                name,
            });
            setRooms(prev => [...prev, { name: data.name, id: data.id }]);
        } catch (error) { 
            console.log(error);
        }
    };

    const onToRoom = (id: number) => {
        router.push(`/rooms/${id}`);
    };
    return (
        <div className={styles.wraper}>
            <div className={styles.createRoom}>
                <h1>Rooms</h1>
                <CreateModal onCreate={onCreateRoom} buttonName="createRoom" />
            </div>
            <div className={styles.continer}>
                {rooms.map((el: IRoomData, i: number) => {
                    return (
                        <div
                            className={styles.room}
                            key={el.id}
                            onClick={() => {
                                onToRoom(el.id);
                            }}
                        >
                            {el.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
