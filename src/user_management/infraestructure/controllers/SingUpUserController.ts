import { UserResponse } from './../../application/dtos/response/UserResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { SingUpUserRequest } from '../../application/dtos/request/SignUpUserRequest';
import { Request, Response } from "express";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { SingUpUserCase } from '../../application/use_case/SignUpUserCase';
import { EncryptService } from '../../domain/services/EncriptServices';

export class SingUpUserController {

    constructor(readonly singUpUserCase: SingUpUserCase, readonly emailService: EmailService, readonly encryptionService: EncryptService) {
    }

    async execute(req: Request, res: Response) {
        const data = req.body;
        if (!data.email || !data.password){
            const baseResponse = new BaseResponse(null, "Email and password are required", false);
            res.status(400).send(baseResponse);
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(data.email)) {
            const baseResponse = new BaseResponse(null, "Invalid email format", false);
            res.status(400).send(baseResponse);
            return;
        }

        if (!data.name) {
            const baseResponse = new BaseResponse(null, "Name is required", false);
            res.status(400).send(baseResponse);
            return;
        }

        if (data.password.length > 20) {
            const baseResponse = new BaseResponse(null, "Password must not exceed 20 characters", false);
            res.status(400).send(baseResponse);
            return;
        }

        if (data.password.length < 8) {
            const baseResponse = new BaseResponse(null, "Password must be at least 8 characters", false);
            res.status(400).send(baseResponse);
            return;
        }
        data.password = await this.encryptionService.execute(data.password);
        const singUpUserRequest = new SingUpUserRequest(data.email, data.password, data.name, data.lastname, data.phoneNumber);
        try {
            const user = await this.singUpUserCase.execute(singUpUserRequest);
            if (user) {
                const verificationUrl = `http://${process.env.URL_SERVER}:${process.env.PORT_SERVER}/users/activate/${user.uuid}`;
                await this.emailService.sendEmail(user.credentials.email, "VERITY", `por favor verifiquse aqui: ${verificationUrl}`);
                const userResponse = new UserResponse(user);
                const baseResponse = new BaseResponse(userResponse, "User successfully created", true);
                res.status(200).send(baseResponse);
            } else {
                const baseResponse = new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false);
                res.status(500).send(baseResponse);
            }
        } catch (error) {

            const baseResponse = new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false);
            res.status(204).send(baseResponse);
        }
    }
}