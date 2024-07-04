import { TagInterface } from "../../domain/ports/TagInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TagDtoMapper } from "../mappers/TagDtoMapper";
import { Request } from "express";
export class UpdateTagUseCase {
    constructor(readonly tagInterface: TagInterface) {}

    async execute(uuid:string, req: Request): Promise<BaseResponse> {
        let request = TagDtoMapper.toUpdateTagRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let tag = TagDtoMapper.toDomain(request);
        let result = await this.tagInterface.update(uuid, tag);
        if (result) {
            let response = TagDtoMapper.toTagResponse(result);
            return new BaseResponse(response, 'Tag updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Tag not updated', false, 400);
    }
}