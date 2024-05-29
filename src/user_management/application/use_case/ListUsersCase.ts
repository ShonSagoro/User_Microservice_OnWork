import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";

export class ListUsersCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(): Promise<User[]| null> {
        return this.userInterface.list();
    }
}