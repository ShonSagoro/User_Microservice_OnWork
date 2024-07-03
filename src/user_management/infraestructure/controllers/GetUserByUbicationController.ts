import { Request, Response } from 'express';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { GetByUbicationUserUseCase } from '../../application/use_case/GetByUbicationUserUseCase';

export default class GetUserByUbicationController {
    constructor(readonly useCase: GetByUbicationUserUseCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        try {
            const baseResponse = await this.useCase.execute(req);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}