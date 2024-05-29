import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { EncryptService } from '../../domain/services/EncriptServices';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { SingInUserCase } from '../../application/use_case/SignInUserUseCase';
import { TokenServices } from '../../domain/services/TokenServices';
import { SingInUserRequest } from '../../application/dtos/request/SignInUserRequest';
import { Request, Response } from "express";

export class SingInUserController {
    constructor(readonly singInUserCase: SingInUserCase, readonly encryptionService: EncryptService, readonly tokenServices: TokenServices) { }

    async execute(req: Request, res: Response) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const data = req.body;
        const singInUserRequest = new SingInUserRequest(data.email, data.password);
        try {
            if (!singInUserRequest.email || !singInUserRequest.password) {
                let baseResponse = new BaseResponse(null, "Email and password is required", false);
                res.status(400).json(baseResponse);
                return;
            }
            if (!emailRegex.test(singInUserRequest.email)) {
                let baseResponse = new BaseResponse(null, "Invalid email format", false);
                res.status(400).json(baseResponse);
                return;
            }
            let user = await this.singInUserCase.execute(singInUserRequest, this.encryptionService, this.tokenServices);
            if (user) {
                const uuid = user.uuid;
                const token = await JWTMiddleware.GenerateToken({ uuid: uuid });
                const tokens = {
                    jwt_token: token,
                    user_token: user.status.token
                }
                const baseResponse = new BaseResponse(tokens, "You have successfully logged in", true);
                res.status(200).json(baseResponse);
                
            } else {
                const baseResponse = new BaseResponse(null, "User not found", false);
                res.status(404).send(baseResponse);
                return; 
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}