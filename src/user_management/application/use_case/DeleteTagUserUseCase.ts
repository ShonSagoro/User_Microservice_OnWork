import { TagInterface } from "../../domain/ports/TagInterface";
import { UserTagInterface } from "../../domain/ports/UserTagInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteTagUserUseCase {
    constructor(readonly user_tag_interface: UserTagInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.user_tag_interface.delete(uuid);
        if (result) {
            return new BaseResponse(null, 'User-Tag deleted successfully', true, 200);
        }
        return new BaseResponse(null, 'User-Tag not found', false, 404);
    }
}