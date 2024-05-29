import { Credentials } from "../../domain/entities/Credentials";
import { Status } from "../../domain/entities/Status";
import { Contact } from "../../domain/entities/Contact";
import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { UpdateUserRequest } from "../dtos/request/UpdateUserRequest";

export class UpdateUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, user_update: UpdateUserRequest): Promise<User | null> {
        let contact = new Contact(user_update.name, user_update.lastName, user_update.phoneNumber)
        let credentials= new Credentials(user_update.email, user_update.password)
        let status = new Status("", new Date())

        let user = new User(status, contact, credentials);
        console.log(user)
        return this.userInterface.update(uuid, user);
    }
}