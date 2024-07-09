import { Request } from "express";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserTagInterface } from "../../domain/ports/UserTagInterface";
import { UserTagDtoMapper } from "../mappers/UserTagDtoMapper";
import { UserTag } from "../../domain/entities/UserTag";

export class CreateUserTagUseCases {
    constructor(readonly repostory: UserTagInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = UserTagDtoMapper.toCreateUserTagRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let domain = UserTagDtoMapper.toDomain(request);
        let result: UserTag | null = await this.repostory.create(domain);
        if (result) {
            let response = UserTagDtoMapper.toUserTagResponse(result);
            return new BaseResponse(response, 'Tag and user has been associated in successfully', true, 200);
        }
        return new BaseResponse(null, 'UserTag not created', false, 404);
    }
} 