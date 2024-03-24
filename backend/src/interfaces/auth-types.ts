import { Request } from "express";

export interface IUserRegister {
    email: string;
    password: string;
    fullName: string;
}

export interface IUserLogin {
    email: string;
    password: string
}


export interface AuthorizedRequest extends Request {
  userId: number;
  isAdmin: boolean;
}