import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UserResponse } from '../../application/dtos/response/UserResponse';
import { SignInUserUseCase } from '../../application/use_case/SignInUserUseCase';
import { Request, Response } from "express";

export class SignInUserController {
    constructor(readonly useCase: SignInUserUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
            if (baseResponse.success) {
                const user: UserResponse = baseResponse.data.user;
                const token = await JWTMiddleware.GenerateToken(user);
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