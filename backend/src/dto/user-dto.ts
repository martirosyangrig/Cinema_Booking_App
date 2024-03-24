import { User } from "../entity/user/user-entity";

export class UserDto {
    email: string;
    id: number | undefined;
    fullName: string;
    admin: boolean

    constructor(model: User) {
        this.email = model.email;
        this.id = model.id;
        this.fullName = model.fullName
        this.admin = model.admin
    }
}