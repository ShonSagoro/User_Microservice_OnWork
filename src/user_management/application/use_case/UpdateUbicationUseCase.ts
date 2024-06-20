import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class UpdateUbicationUseCase {
    constructor(private userInterface: UserInterface) { }
    async execute(uuid: string, req: Request): Promise<BaseResponse> {
        let ubication = UserDtoMapper.toUpdateUbicationUserRequest(req);
        if (!ubication) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        if (ubication.latitude == undefined || ubication.longitude == undefined) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        if (ubication.latitude < -90 || ubication.latitude > 90 || ubication.longitude < -180 || ubication.longitude > 180) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.update_ubication(uuid, ubication.latitude, ubication.longitude);
        if (result) {
            let response = UserDtoMapper.toUbicationUserResponse(result);
            return new BaseResponse(response, 'Ubication updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Ubication not updated', false, 400);
    }
}