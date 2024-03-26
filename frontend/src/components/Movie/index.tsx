"use client";
import { useEffect, useState } from "react";
import styles from "./movie.module.scss";
import { Api } from "@/services/axios";
import { toast } from "react-toastify";
import seats from "@/constants/seats";
import { IBookedSeats, IUserInfo } from "./types";

export default function Movie({
    roomId,
    movieId,
}: {
    roomId: string;
    movieId: string;
}) {
    const [selectedSeatNumber, setSelectedSeatNumber] = useState<null | number>(
        null
    );
    const [userInfo, setUserInfo] = useState<IUserInfo>();
    const [movieName, setMovieName] = useState<string>("");
    const [bookedSeats, setBookedSeats] = useState<IBookedSeats[]>([]);
    const [myBookedSeats, setMyBookedSeats] = useState<IBookedSeats[]>([]);
    useEffect(() => {
        const userData: IUserInfo = JSON.parse(
            localStorage.getItem("userData") as string
        );
        setUserInfo(userData);
    }, []);

    useEffect(() => {
        const getMovieInfo = async () => {
            try {
                const { data }: { data: any } = await Api.get(
                    `/movie/${movieId}`
                );
                if (data.bookings.length) {
                    const bookedSeatsData: IBookedSeats[] = data.bookings.map(
                        (el: any) => {
                            return {
                                seatNumber: el.seatNumber,
                                userId: el.user.id,
                                userName: el.user.fullName,
                            };
                        }
                    );
                    setBookedSeats(bookedSeatsData);
                    console.log(data);
                }

                setMovieName(data.title);
            } catch (error) {
                console.log(error);
            }
        };
        getMovieInfo();
    }, [roomId, movieId]);

    const onSelectSeat = (seatNumber: number) => {
        setSelectedSeatNumber(seatNumber);
    };

    const onBook = async () => {
        try {
            if (!selectedSeatNumber) throw new Error("Select a seat");

            await Api.post("/book", {
                movieId,
                seatNumber: selectedSeatNumber,
            });
            if (userInfo)
                setBookedSeats((prev) => [
                    ...prev,
                    {
                        userId: userInfo.id,
                        userName: userInfo.fullName,
                        seatNumber: selectedSeatNumber,
                    },
                ]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const myBookedSeats = bookedSeats.filter((el) => {
            return el.userId === userInfo?.id;
        });
        setMyBookedSeats(myBookedSeats);
    }, [bookedSeats]);

    return (
        <div className={styles.wraper}>
            <div className={styles.continer}>
                <div className={styles.headerCont}>
                    <div className={styles.movieInfo}>{movieName}</div>
                    <div className={styles.bookSeatCont}>
                        <span>Seat number {selectedSeatNumber}</span>
                        <button onClick={onBook} className={styles.bookSeat}>
                            book
                        </button>
                    </div>
                </div>
                <div className={styles.seatsContiner}>
                    {seats.map((el, id) => {
                        return (
                            <div
                                key={id}
                                className={
                                    bookedSeats.some(
                                        (seat) => seat.seatNumber === el
                                    )
                                        ? styles.bookedSeat
                                        : selectedSeatNumber === el
                                        ? styles.selectedSeat
                                        : styles.seat
                                }
                                onClick={() => {
                                    if (
                                        !bookedSeats.some(
                                            (seat) => seat.seatNumber === el
                                        ) ||
                                        !bookedSeats.length
                                    ) {
                                        onSelectSeat(el);
                                    }
                                }}
                            >
                                {el}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.myBookings}>
                    My bookings -
                    {myBookedSeats.map((el) => {
                        return <span>{el.seatNumber},</span>;
                    })}
                </div>
            </div>
        </div>
    );
}
