import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class GetByTagUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.userInterface.find_by_tag_uuid(uuid);
        if (result) {
            let responses = result.map((user: User) => UserDtoMapper.toUserResponse(user));
            return new BaseResponse(responses, 'Users by tag has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'User find not found', false, 404);
    }
}