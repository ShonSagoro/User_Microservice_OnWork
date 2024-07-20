import { BaseResponse } from "../../../middleware/dtos/BaseResponse";
import { ListChatByUserUseCase } from "../../application/use_cases/ListChatByUserUseCase";
import { Request, Response } from "express";

export class ListChatByUserController {

    constructor(readonly useCase: ListChatByUserUseCase) {
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