import { Message } from "../../domain/entities/message";
import { MessageInterface } from "../../domain/port/message_interface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { MessageMapperDTO } from "../mappers/MessageMapperDTO";


export class ListMessageByChatUseCase {
    constructor(readonly repository: MessageInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.repository.find_by_chat(uuid);
        if (result) {
            let responses = result.map((message: Message) => MessageMapperDTO.toResponse(message));
            return new BaseResponse(responses, 'Message by chat uuid has been find successfully', true, 200);
        }
        return new BaseResponse(null, 'Messages find not found', false, 404);
    }
}