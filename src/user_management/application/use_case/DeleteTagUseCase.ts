import { TagInterface } from "../../domain/ports/TagInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteTagUseCase {
    constructor(readonly tagInterface: TagInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.tagInterface.delete(uuid);
        if (result) {
            return new BaseResponse(null, 'Tag deleted successfully', true, 200);
        }
        return new BaseResponse(null, 'Tag not found', false, 404);
    }
}