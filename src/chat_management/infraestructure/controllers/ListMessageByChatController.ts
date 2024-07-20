import { BaseResponse } from "../../../middleware/dtos/BaseResponse";
import { Request, Response } from "express";
import { ListMessageByChatUseCase } from "../../application/use_cases/ListMessageByChatUseCase";

export class ListMessageByChatController {

    constructor(readonly useCase: ListMessageByChatUseCase) {
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