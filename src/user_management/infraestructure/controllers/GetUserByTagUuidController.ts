import { Request, Response } from 'express';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { GetByUserUseCase } from '../../application/use_case/GetByUserUseCase';
import { GetByTagUserUseCase } from '../../application/use_case/GetByTagUserUseCase';

export default class GetUserByTagUuidController {
    constructor(readonly useCase: GetByTagUserUseCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        const { uuid } = req.params;
        try {
            const baseResponse = await this.useCase.execute(uuid);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}