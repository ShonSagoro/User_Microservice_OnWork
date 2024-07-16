import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { User } from "../../domain/entities/User";

export class FindUserByUbicationUseCase {
    constructor(readonly userInteface: UserInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toFindUserByUbicationRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInteface.find_by_ubication(request.latitude, request.longitud);
        if (result) {
            let responses = result.map((user: User) => UserDtoMapper.toUserResponse(user));
            return new BaseResponse(responses, 'Users found', true, 200);
        } 
        return new BaseResponse(null, 'User not found', false, 404);
    }
}