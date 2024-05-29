import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { SignInUserRequest } from "../dtos/request/SignInUserRequest";

export class SignInUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(singInUserRequest:SignInUserRequest, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        return await this.userInterface.sign_in(singInUserRequest.email, singInUserRequest.password, encryptionService, tokenServices);
    }
} 