import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { Request } from "express";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class ActivateUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toActivateUserRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.update_user_verified_at(uuid, request.token);
        if (result) {
            return new BaseResponse(null, 'User activated successfully', true, 200);
        }
        return new BaseResponse(null, 'Token Error or User not found', false, 404);
    }
}