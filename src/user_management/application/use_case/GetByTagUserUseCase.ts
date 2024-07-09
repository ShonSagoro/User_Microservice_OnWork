import { TagResponse } from './../dtos/response/TagResponse';
import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { TagDtoMapper } from '../mappers/TagDtoMapper';

export class GetByTagUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.userInterface.find_by_tag_uuid(uuid);
        let tags = await this.userInterface.find_all_tags_by_user_uuid(uuid);
        if (result && tags) {
            let responses = result.map((user: User) => UserDtoMapper.toUserResponse(user));
            return new BaseResponse(responses, 'Users by tag has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'User find not found', false, 404);
    }
}