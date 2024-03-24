import { NextFunction, Request, Response } from "express";
import { IUserLogin, IUserRegister } from "../../interfaces/auth-types";
import { UserAuthService } from "../../services/auth/user-auth.service";
import HttpStatusCodes from "../../utils/HTTPStatusCodes";
import { UserDto } from "../../dto/user-dto";

export class UserAuthController {
    static async signup(
        req: Request<IUserRegister>,
        res: Response<UserDto | unknown>,
        next: NextFunction
    ) {
        try {
            const registrationForm: IUserRegister = req.body;
            if (
                !registrationForm.email ||
                !registrationForm.fullName ||
                !registrationForm.password
            )
                throw new Error("Need all required fields");

            const userData = await UserAuthService.signup(registrationForm);

            res.status(HttpStatusCodes.OK).json(userData);
        } catch (error) {
            next(error);
        }
    }

    static async login(
        req: Request<IUserLogin>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const loginForm: IUserLogin = req.body;
            if (!loginForm.email || !loginForm.password) {
                throw new Error("login and password required");
            }
            const userData = await UserAuthService.login(loginForm);

            res.status(HttpStatusCodes.OK).json(userData);
        } catch (error) {
            next(error);
        }
    }
}
