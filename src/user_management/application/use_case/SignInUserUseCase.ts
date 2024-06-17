import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class SignInUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let singInUserRequest = UserDtoMapper.toSignIpUserRequest(req);
        if (!singInUserRequest) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.sign_in(singInUserRequest.email, singInUserRequest.password);
        console.log(result);
        if (result) {
            let response = UserDtoMapper.toTokenUserReponse(result);
            return new BaseResponse(response, 'User signed in successfully', true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
} 