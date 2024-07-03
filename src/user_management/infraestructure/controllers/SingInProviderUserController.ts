import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { Request, Response } from "express";
import { SignInProviderUserUseCase } from '../../application/use_case/SignInProviderUserUseCase';

export class SingInProviderUserController {
    constructor(readonly useCase: SignInProviderUserUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
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