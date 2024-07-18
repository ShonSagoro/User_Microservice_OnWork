import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { Request, Response } from "express";
import { SignInProviderUserUseCase } from '../../application/use_case/SignInProviderUserUseCase';

export class ValidateUserController {
    constructor() { }

    async execute(req: Request, res: Response) {
        try {
            const body = req.body;
            const baseResponse =new BaseResponse(body.user, "User is valid", true, 200);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}