"use client";

import { useEffect, useState } from "react";
import { Api } from "@/services/axios";
import CreateModal from "../Rooms/CreateModal";
import { useRouter } from "next/navigation";
import { IRoomData } from "../Rooms/types";
import { ICreatedMovieData, IMovie } from "./types";

import styles from "./roomById.module.scss";

export default function Room({ roomId }: { roomId: string }) {
    const [movies, setMovies] = useState<IMovie[]>([]);

    const router = useRouter();

    useEffect(() => {
        const getRoomMovies = async () => {
            try {
                const { data }: { data: IRoomData[] } = await Api.get(
                    `/movies/${roomId}`
                );

                if (data[0].movies) setMovies(data[0].movies);
            } catch (error) {
                console.log(error);
            }
        };
        getRoomMovies();
    }, [roomId]);

    const onCreateMovie = async (title: string) => {
        try {
            const { data }: { data: ICreatedMovieData } = await Api.post(
                "/createMovie",
                {
                    roomId,
                    title,
                }
            );

            setMovies((prev) => [...prev, { title, id: data.id }]);
        } catch (error) {
            console.log(error);
        }
    };

    const onToMovie = (id: number) => {
        router.push(`/rooms/${roomId}/${id}`);
    };
    return (
        <div className={styles.wraper}>
            <div className={styles.createMovie}>
                <h1>Room {roomId}</h1>
                <h1>Movies</h1>
                <CreateModal
                    onCreate={onCreateMovie}
                    buttonName={"createMovie"}
                />
            </div>
            <div className={styles.continer}>
                {movies.map((el: IMovie, i: number) => {
                    return (
                        <div
                            className={styles.movie}
                            key={el.id}
                            onClick={() => {
                                onToMovie(el.id);
                            }}
                        >
                            {el.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
