import { UserInterface } from "../../domain/ports/UserInterface";
import { Request } from "express";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TokenServices } from "../../domain/services/TokenServices";

export class SignUpUserProviderUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toSignUpUserRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let user = UserDtoMapper.toDomainUserProviderSignUp(request);
        let result = await this.userInterface.sign_up_provider(user);
        if (result) {
            let response = UserDtoMapper.toSingUpUserResponse(result);
            return new BaseResponse(response, 'User Provider created successfully', true, 201);
        }
        return new BaseResponse(null, 'User Provider not created', false, 400);
    }
}