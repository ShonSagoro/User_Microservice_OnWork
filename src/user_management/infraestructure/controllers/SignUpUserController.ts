import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { Request, Response } from "express";
import { SignUpUserUseCase } from '../../application/use_case/SignUpUserUseCase';

export class SingUpUserController {

    constructor(readonly useCase: SignUpUserUseCase, readonly emailService: EmailService) {
    }

    async execute(req: Request, res: Response) {
        try {
            let baseResponse = await this.useCase.execute(req);
            if (!baseResponse.success) {
                baseResponse.apply(res);
                return;
            }
            let user = baseResponse.data;
            let message = `Welcome ${user.name} to our platform, your code is ${user.token}`;
            this.emailService.sendEmail(user.email, "welcome", message);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}