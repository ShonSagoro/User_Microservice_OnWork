import { TagInterface } from "../../domain/ports/TagInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { TagDtoMapper } from "../mappers/TagDtoMapper";

export class GetByUuidTagUseCase {
    constructor(readonly tagInterface: TagInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.tagInterface.findByUUID(uuid);
        if (result) {
            let response = TagDtoMapper.toTagResponse(result);
            return new BaseResponse(response, 'Tag has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'Tag not found', false, 404);
    }
}