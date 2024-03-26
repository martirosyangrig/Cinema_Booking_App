import { IUserLogin, IUserRegister } from "../../interfaces/auth-types";
import { userRepository } from "../../repositories";
import { UserDto } from "../../dto/user-dto";
import { compare, getHash } from "../../utils/hash";
import { generateToken } from "../../utils/generateToken";

export class UserAuthService {
    static async signup(registerForm: IUserRegister) {
        const user = await userRepository.findOneBy({
            email: registerForm.email,
        });
        if (user) throw new Error("There is user with that email");

        const hashedPassword = getHash(registerForm.password);
        const newUser = userRepository.create({
            ...registerForm,
            password: hashedPassword,
            admin: true
        });
        await userRepository.save(newUser);

        return newUser;
    }

    static async login(loginForm: IUserLogin) {
        const user = await userRepository.findOneBy({
            email: loginForm.email,
        });
        if (!user) throw new Error("Invalid Login or Password");

        const match = await compare(loginForm.password, user.password);
        if (!match) throw new Error("Invalid Login or Password");

        const userData = new UserDto(user);
        const accessToken = generateToken({ ...userData });

        return { accessToken, userData };
    }
}
