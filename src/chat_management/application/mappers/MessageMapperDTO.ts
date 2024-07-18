import { Message } from '../../domain/entities/message';
import { MessageResponse } from '../dtos/response/MessageResponse';
import { CreateMessageRequest } from '../dtos/request/CreateMessageRequest';
import { Request } from 'express';

export class MessageMapperDTO {
    static toCreateDTO(req: Request): CreateMessageRequest| null {
        const body = req.body;
        if (!body.message || !body.chat_uuid || !body.user_owner_uuid) {
            return null;
        }
        return new CreateMessageRequest(body.message, body.chat_uuid, body.user_owner_uuid);     
    }

    static toDomainCreateDTO(createMessageRequest: CreateMessageRequest): Message {
        return new Message(createMessageRequest.message, createMessageRequest.chat_uuid, createMessageRequest.user_owner_uuid, new Date().toISOString(), new Date().toISOString());
    }

    static toResponse(message: Message): MessageResponse{
        return new MessageResponse(message.uuid, message.message, message.chat_uuid, message.user_owner_uuid, message.createdAt, message.updatedAt);
    }

}