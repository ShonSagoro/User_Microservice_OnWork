import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";
import { CreateTagUseCases } from '../../application/use_case/CreateTagUseCases';
import { CreateUserTagUseCases } from '../../application/use_case/CreateUserTagUseCase';

export class CreateUserTagController {

    constructor(readonly useCase: CreateUserTagUseCases) {
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