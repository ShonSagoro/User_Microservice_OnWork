import { Tag } from './../../domain/entities/Tag';
import { TagInterface } from './../../domain/ports/TagInterface';
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TagDtoMapper } from '../mappers/TagDtoMapper';

export class ListTagUseCase {
    constructor(readonly tagInterface: TagInterface) {}

    async execute(): Promise<BaseResponse> {
        let result = await this.tagInterface.list();
        if (result) {
            let responses = result.map((tag: Tag) => TagDtoMapper.toTagResponse( tag));
            return new BaseResponse(responses, 'Tags has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'Tag not found', false, 404);
    }
}