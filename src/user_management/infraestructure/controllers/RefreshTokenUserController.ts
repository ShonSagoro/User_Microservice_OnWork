import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { RefreshUserUseCase } from '../../application/use_case/RefreshUserUseCase';
import { SignInUserUseCase } from '../../application/use_case/SignInUserUseCase';
import { Request, Response } from "express";

export class RefreshTokenUserController {
    constructor(readonly useCase: RefreshUserUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            let uuid = req.body.uuid;
            let baseResponse = await this.useCase.execute(uuid);
            if (baseResponse.success) {
                const uuid = baseResponse.data.uuid;
                const token = await JWTMiddleware.GenerateToken({ uuid: uuid });
                baseResponse.data.jwt_token = token;
                baseResponse.apply(res);
            } 
            else {
                baseResponse.apply(res);
            }
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}