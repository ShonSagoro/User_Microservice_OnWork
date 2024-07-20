import { CreateChatUseCases } from '../../application/use_cases/CreateChatUseCases';
import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";

export class CreateChatController {

    constructor(readonly useCase: CreateChatUseCases) {
    }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}