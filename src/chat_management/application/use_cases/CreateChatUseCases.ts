import { Request } from "express";
import { BaseResponse } from "../dtos/response/BaseResponse";
import ChatInterface from "../../domain/port/chat_interface";
import { ChatMapperDTO } from "../mappers/ChatMapperDTO";
import { Chat } from "../../domain/entities/chat";

export class CreateChatUseCases {
    constructor(readonly repostory: ChatInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = ChatMapperDTO.toCreateDTO(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let domain = ChatMapperDTO.toDomainCreateDTO(request);
        let result: Chat | null = await this.repostory.create(domain);
        if (result) {
            let response = ChatMapperDTO.toResponse(result);
            return new BaseResponse(response, 'Chat has been created in successfully', true, 200);
        }
        return new BaseResponse(null, 'Chat not created', false, 404);
    }
} 