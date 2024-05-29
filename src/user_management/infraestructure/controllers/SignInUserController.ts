import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { EncryptService } from '../../domain/services/EncriptServices';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { SignInUserUseCase } from '../../application/use_case/SignInUserUseCase';
import { TokenServices } from '../../domain/services/TokenServices';
import { SignInUserRequest } from '../../application/dtos/request/SignInUserRequest';
import { Request, Response } from "express";

export class SignInUserController {
    constructor(readonly useCase: SignInUserUseCase, readonly encryptionService: EncryptService, readonly tokenServices: TokenServices) { }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req, this.encryptionService, this.tokenServices);
            
            if (baseResponse) {
                const uuid = baseResponse.data.uuid;
                const token = await JWTMiddleware.GenerateToken({ uuid: uuid });
                const tokens = {
                    uuid: uuid,
                    jwt_token: token,
                    user_token: baseResponse.data.status.token
                }
                baseResponse.data = tokens;
                baseResponse.apply(res);
            } else {
                const baseResponse = new BaseResponse(null, "User not found", false, 404);
                baseResponse.apply(res);
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            baseResponse.apply(res);
        }
    }
}