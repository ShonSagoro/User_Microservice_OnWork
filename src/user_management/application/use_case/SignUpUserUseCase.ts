import { UserInterface } from "../../domain/ports/UserInterface";
import { Request } from "express";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TokenServices } from "../../domain/services/TokenServices";

export class SignUpUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toSignUpUserRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let user = UserDtoMapper.toDomainUserSignUp(request);
        let result = await this.userInterface.sign_up(user);
        if (result) {
            let response = UserDtoMapper.toSingUpUserResponse(result);
            return new BaseResponse(response, 'User created successfully', true, 201);
        }
        return new BaseResponse(null, 'User not created', false, 400);
    }
}