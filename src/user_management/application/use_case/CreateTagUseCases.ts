import { Request } from "express";
import { TagInterface } from "../../domain/ports/TagInterface";
import { TagDtoMapper } from "../mappers/TagDtoMapper";
import { Tag } from "../../domain/entities/Tag";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class CreateTagUseCases {
    constructor(readonly repostory: TagInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let createTagRequest = TagDtoMapper.toCreateTagRequest(req);
        if (!createTagRequest) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let domain = TagDtoMapper.toDomain(createTagRequest);
        let result: Tag | null = await this.repostory.create(domain);
        if (result) {
            let response = TagDtoMapper.toTagResponse(result);
            return new BaseResponse(response, 'Tag has been created in successfully', true, 200);
        }
        return new BaseResponse(null, 'Tag not created', false, 404);
    }
} 