import { Request, Response } from 'express';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UserResponse } from '../../application/dtos/response/UserResponse';
import { GetByUserCase } from '../../application/use_case/GetByUserCase';

export default class GetUserByUuidController {
    constructor(readonly useCase: GetByUserCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        const { uuid } = req.params;
        try {
            const baseResponse = await this.useCase.executeByUUID(uuid);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}