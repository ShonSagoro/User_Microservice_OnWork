import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class UpdateProfileUserUseCase {
    constructor(private userInterface: UserInterface) { }
    async execute(uuid: string, req: Request): Promise<BaseResponse> {
        let profile = UserDtoMapper.toUpdateProfileUserRequest(req);
        if (!profile) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.update_profile(uuid, profile);
        if (result) {
            let response = UserDtoMapper.toProfileUserUpdateRespose(result);
            return new BaseResponse(response, 'Profile updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Profile not updated', false, 400);
    }
}