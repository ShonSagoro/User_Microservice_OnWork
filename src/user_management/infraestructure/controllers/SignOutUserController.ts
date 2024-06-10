import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { SignOutUserCase } from '../../application/use_case/SignOutUserCase';
import { IUserSaga } from '../../domain/services/IUserSaga';

export class SignOutUserController {
    jwtMiddleware = new JWTMiddleware();
    constructor(readonly useCase: SignOutUserCase, readonly useSaga: IUserSaga) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        const headers = req.headers as IncomingHttpHeaders;
        const authHeader = headers['authorization'];
        console.log(authHeader);

        if (!authHeader) {
            const baseResponse = new BaseResponse("Error", "Token not provided", false, 401);
            baseResponse.apply(res);
            return;
        }
        const token = authHeader[0].split(' ')[1]
        try {
            JWTMiddleware.addToBlacklist(token);
            await this.useSaga.sendToken(token);
            const baseResponse = await this.useCase.execute(uuid);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false, 500);
            baseResponse.apply(res);        
        }
    }
}