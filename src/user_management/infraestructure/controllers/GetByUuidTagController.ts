import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";
import { GetByUuidTagUseCase } from '../../application/use_case/GetByUuidTagUseCase';

export class GetByUuidTagController {

    constructor(readonly useCase: GetByUuidTagUseCase) {
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