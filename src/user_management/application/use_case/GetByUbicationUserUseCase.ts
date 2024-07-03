import { Request } from "express";
import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class GetByUbicationUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toUbicationUserRequest(req);
        let result = await this.userInterface.find_by_ubication(request.longitude, request.latitude);
        if (result) {
            let responses = result.map((user: User) => UserDtoMapper.toUserResponse(user));
            return new BaseResponse(responses, 'Users by tag has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'User by tag has been find not found', false, 404);
    }
}