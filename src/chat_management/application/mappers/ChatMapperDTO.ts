import { Message } from '../../domain/entities/message';
import { MessageResponse } from '../dtos/response/MessageResponse';
import { CreateMessageRequest } from '../dtos/request/CreateMessageRequest';
import { Request } from 'express';
import { CreateChatRequest } from '../dtos/request/CreateChatRequest';
import { Chat } from '../../domain/entities/chat';
import { ChatResponse } from '../dtos/response/ChatResponse';

export class ChatMapperDTO {
    static toCreateDTO(req: Request): CreateChatRequest| null {
        const body = req.body;
        if (!body.from_user_uuid || !body.to_user_uuid) {
            return null;
        }
        return new CreateChatRequest(body.from_user_uuid, body.to_user_uuid);
    }

    static toDomainCreateDTO(createMessageRequest: CreateChatRequest): Chat {
        return new Chat(createMessageRequest.from_user_uuid, createMessageRequest.to_user_uuid, new Date().toISOString());
    }

    static toResponse(chat: Chat): ChatResponse{
        return new ChatResponse(chat.uuid, chat.from_user_uuid, chat.to_user_uuid, chat.createdAt);
    }

}