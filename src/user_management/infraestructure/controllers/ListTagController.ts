import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";
import { ListTagUseCase } from '../../application/use_case/ListTagUseCase';

export class ListTagController {

    constructor(readonly useCase: ListTagUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute();
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}