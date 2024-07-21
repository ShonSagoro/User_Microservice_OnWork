import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class UpdateImageUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, url_image: string): Promise<BaseResponse> {
 
        if (!uuid || !url_image) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let result = await this.userInterface.update_image(uuid, url_image);
        if (result) {
            let response = UserDtoMapper.toUserResponse(result);
            return new BaseResponse(response, "User Image has been upload ", true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
} 