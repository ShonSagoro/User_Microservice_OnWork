import { UserInterface } from "../../domain/ports/UserInterface";

export class SignOutUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<void> {
        return await this.userInterface.sign_out(uuid);
    }
}