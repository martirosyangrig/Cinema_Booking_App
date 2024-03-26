export interface IUserLoginData {
    accessToken: string;
    userData: {
        admin: boolean;
        email: string;
        fullName:  string;
        id: number
    }
}