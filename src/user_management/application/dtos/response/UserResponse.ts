import { User } from "../../../domain/entities/User";

export class UserResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;

    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}