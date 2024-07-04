import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";
import { ListTagUseCase } from '../../application/use_case/ListTagUseCase';
import { UpdateTagUseCase } from '../../application/use_case/UpdateTagUseCase';

export class UpdateTagController {

    constructor(readonly useCase: UpdateTagUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let uuid = req.params.uuid;
            let baseResponse = await this.useCase.execute(uuid, req);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}