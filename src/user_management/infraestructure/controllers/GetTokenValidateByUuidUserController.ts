import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { Request, Response } from "express";
import { GetTokenValidateByUuidUserUseCase } from '../../application/use_case/GetTokenValidateByUuidUserUseCase';

export class GetTokenValidateByUuidUserController {

    constructor(readonly useCase: GetTokenValidateByUuidUserUseCase, readonly emailService: EmailService) {
    }

    async execute(req: Request, res: Response) {
        try {
            let email = req.params.email;
            console.log("GetTokenValidateByUuidUserController -> execute: ", email);
            let baseResponse = await this.useCase.execute(email);
            if (!baseResponse.success) {
                baseResponse.apply(res);
                return;
            }
            let user = baseResponse.data;
            let message = `Your token is ${user.token}`;
            this.emailService.sendEmail(user.email, "Refresh Token", message);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}