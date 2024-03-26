export interface IBookedSeats {
    seatNumber: number;
    userId: number;
    userName: string;
}

export interface IUserInfo {
    id: number;
    email: string;
    fullName: string;
    admin: boolean;
}