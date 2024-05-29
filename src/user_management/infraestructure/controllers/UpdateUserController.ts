import { Request, Response } from "express";
import { UpdateUserRequest } from "../../application/dtos/request/UpdateUserRequest";
import { UserResponse } from "../../application/dtos/response/UserResponse";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateUserUseCase } from "../../application/use_case/UpdateUserCase";
import { EncryptService } from "../../domain/services/EncriptServices";

export class UpdateUserController {
    constructor(readonly updateUserCase: UpdateUserUseCase, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        // let email_regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        // if (!email_regex.test(data.email)) {
        //     const baseResponse = new BaseResponse(null, "Format email incorrect", false);
        //     res.status(400).send(baseResponse);
        //     return;
        // }
        // if (data.password.length < 8 && data.password) {
        //     const baseResponse = new BaseResponse(null, "Password must be at least 8 characters", false);
        //     res.status(400).send(baseResponse);
        //     return;
        // }
        // data.password = await this.encryptionService.execute(data.password);
        // const number_phone_regex = /^\d{10}$/;
        // if (!number_phone_regex.test(data.phoneNumber)) {
        //     const baseResponse = new BaseResponse(null, "Invalid phone number. Please enter a 10-digit phone number without any spaces or special characters.", false);
        //     res.status(400).send(baseResponse);
        //     return;
        // }
        // if (data.email.length > 250 || data.name.length > 100 || data.lastname.length > 100) {
        //     const baseResponse = new BaseResponse(null, "Input fields are too long", false);
        //     return res.status(400).json(baseResponse);
        // }

        const { uuid } = req.params;
        const userUpdateRequest = new UpdateUserRequest(data.email, data.password, data.name, data.lastname, data.phoneNumber);
        userUpdateRequest.password = await this.encryptionService.execute(userUpdateRequest.password);

        try {
            const user = await this.updateUserCase.execute(
                uuid, userUpdateRequest
            );
            if (user) {
                const userResponse = new UserResponse(user);
                const baseResponse = new BaseResponse(userResponse, "User successfully updated", true);
                res.status(200).send(baseResponse);
            } else {
                const baseResponse = new BaseResponse(null, "Error to update user", false);
                res.status(400).send(baseResponse);
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(204).send(baseResponse);
        }
    }
}