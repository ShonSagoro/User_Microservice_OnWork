import { MessageInterface } from "../../domain/port/message_interface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteMessageUseCase {
    constructor(readonly repostory: MessageInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repostory.delete(uuid);
        if (result) {
            return new BaseResponse(null, 'Message deleted successfully', true, 200);
        }
        return new BaseResponse(null, 'Message not found', false, 404);
    }
}