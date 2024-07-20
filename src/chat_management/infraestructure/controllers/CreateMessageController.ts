import { CreateMessageUseCases } from '../../application/use_cases/CreateMessageUseCases';
import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";

export class CreateMessageController {

    constructor(readonly useCase: CreateMessageUseCases) {
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