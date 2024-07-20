import { DeleteMessageUseCase } from '../../application/use_cases/DeleteMessageUseCase';
import { GetChatByUuidUseCase } from '../../application/use_cases/GetChatByUuidUseCase';
import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";

export class GetChatByUuidController {

    constructor(readonly useCase: GetChatByUuidUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let uuid = req.params.uuid;
            let baseResponse = await this.useCase.execute(uuid);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}