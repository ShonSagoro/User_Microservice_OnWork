import ChatInterface from "../../domain/port/chat_interface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ChatMapperDTO } from "../mappers/ChatMapperDTO";

export class GetChatByUuidUseCase {
    constructor(readonly repository: ChatInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.find(uuid);
        if (result) {
            let response = ChatMapperDTO.toResponse(result);
            return new BaseResponse(response, 'Chat has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'Chat find not found', false, 404);
    }
}