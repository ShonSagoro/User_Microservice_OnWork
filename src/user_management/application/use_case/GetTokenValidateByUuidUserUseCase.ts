import { Request } from "express";
import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class GetTokenValidateByUuidUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<BaseResponse> {
        let result = await this.userInterface.findByUUID(uuid);
        if (result) {
            let response = UserDtoMapper.toSingUpUserResponse(result);
            return new BaseResponse(response, 'User Token has been send', true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
}