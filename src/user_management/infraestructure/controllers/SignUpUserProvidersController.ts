import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { Request, Response } from "express";
import { SignUpUserProviderUseCase } from '../../application/use_case/SignUpUserProviderUseCase';

export class SignUpUserProvidersController {

    constructor(readonly useCase: SignUpUserProviderUseCase, readonly emailService: EmailService) {
    }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
            if (!baseResponse.success) {
                baseResponse.apply(res);
                return;
            }
            let user = baseResponse.data;
            let message = `Welcome ${user.name} to our platform, we hope you are ready to work, your code is ${user.token}`;
            this.emailService.sendEmail(user.email, "welcome", message);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}