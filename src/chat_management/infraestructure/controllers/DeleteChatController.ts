import { DeleteChatUseCase } from '../../application/use_cases/DeleteChatUseCase';
import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";

export class DeleteChatController {

    constructor(readonly useCase: DeleteChatUseCase) {
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