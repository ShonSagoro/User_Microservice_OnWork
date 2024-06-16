import { Request, Response } from 'express';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UserResponse } from '../../application/dtos/response/UserResponse';
import { GetByUserUseCase } from '../../application/use_case/GetByUserUseCase';

export default class GetUserByEmailController {
    constructor(readonly useCase: GetByUserUseCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        try {
            const baseResponse = await this.useCase.executeByEmail(email);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}
