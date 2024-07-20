import { Chat } from "../../domain/entities/chat";
import ChatInterface from "../../domain/port/chat_interface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ChatMapperDTO } from "../mappers/ChatMapperDTO";


export class ListChatByUserUseCase {
    constructor(readonly repository: ChatInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.findByUser(uuid);
        if (result) {
            let responses = result.map((chat: Chat) => ChatMapperDTO.toResponse(chat));
            return new BaseResponse(responses, 'Chats has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'Chats find not found', false, 404);
    }
}