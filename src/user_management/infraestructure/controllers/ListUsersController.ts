import { ListUsersUseCase } from '../../application/use_case/ListUsersUseCase';
import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";

export class ListUsersController {
    constructor(readonly useCase: ListUsersUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.execute();
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(204).send(baseResponse);
        }
    }
}