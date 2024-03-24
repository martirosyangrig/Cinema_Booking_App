import jwt from "jsonwebtoken";
import { envConfig } from "../configs/env";
import { UserDto } from "../dto/user-dto";

export const generateToken = (payload: UserDto) =>
    jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (accessToken: string) => {
    const decoded = jwt.verify(accessToken, envConfig.JWT_SECRET) as Record<
        string,
        any
    >;
    if (!decoded) throw new Error("Can't decode token");

    return decoded;
};
