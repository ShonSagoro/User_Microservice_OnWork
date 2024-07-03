import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class RefreshUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.userInterface.refresh_token(uuid);
        if (result) {
            let response = UserDtoMapper.toTokenUserReponse(result);
            return new BaseResponse(response, 'Token refresh success', true, 200);
        }
        return new BaseResponse(null, 'You need log in first', false, 404);
    }
}