import ChatInterface from "../../domain/port/chat_interface";
import { MessageInterface } from "../../domain/port/message_interface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteChatUseCase {
    constructor(readonly repository: ChatInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.delete(uuid);
        if (result) {
            return new BaseResponse(null, 'Chat deleted successfully', true, 200);
        }
        return new BaseResponse(null, 'Chat not found', false, 404);
    }
}