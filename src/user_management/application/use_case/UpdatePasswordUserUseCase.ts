import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class UpdatePasswordUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, req: Request): Promise<BaseResponse> {
        let updatePasswordUserRequest = UserDtoMapper.toUpdatePasswordUserRequest(req);
        if (!updatePasswordUserRequest) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.update_password(uuid, updatePasswordUserRequest.password, updatePasswordUserRequest.newPassword);
        if (result) {
            let response = UserDtoMapper.toPasswordUserResponse(result);
            return new BaseResponse(response, response.message, true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
} 