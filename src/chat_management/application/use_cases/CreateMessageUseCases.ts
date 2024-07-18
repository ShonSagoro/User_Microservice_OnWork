import { Request } from "express";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { MessageInterface } from "../../domain/port/message_interface";
import { MessageMapperDTO } from "../mappers/MessageMapperDTO";
import { Message } from "../../domain/entities/message";

export class CreateMessageUseCases {
    constructor(readonly repostory: MessageInterface) {}

    async execute(req: Request): Promise<BaseResponse> {
        let request = MessageMapperDTO.toCreateDTO(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let domain = MessageMapperDTO.toDomainCreateDTO(request);
        let result: Message | null = await this.repostory.create(domain);
        if (result) {
            let response = MessageMapperDTO.toResponse(result);
            return new BaseResponse(response, 'Message has been created in successfully', true, 200);
        }
        return new BaseResponse(null, 'Message not created', false, 404);
    }
} 