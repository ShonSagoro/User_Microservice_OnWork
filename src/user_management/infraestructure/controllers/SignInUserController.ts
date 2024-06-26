import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { SignInUserUseCase } from '../../application/use_case/SignInUserUseCase';
import { Request, Response } from "express";

export class SignInUserController {
    constructor(readonly useCase: SignInUserUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
            if (baseResponse.success) {
                const uuid = baseResponse.data.uuid;
                const token = await JWTMiddleware.GenerateToken({ uuid: uuid });
                const tokens = {
                    uuid: uuid,
                    jwt_token: token,
                }
                baseResponse.data = tokens;
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