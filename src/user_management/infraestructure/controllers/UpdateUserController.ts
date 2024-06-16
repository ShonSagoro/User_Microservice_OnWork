import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { EncryptService } from "../../domain/services/EncriptServices";
import { UpdateUserUseCase } from "../../application/use_case/UpdateUserUseCase";

export class UpdateUserController {
    constructor(readonly useCase: UpdateUserUseCase, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        req.body.password = await this.encryptionService.execute(req.body.password);
        try {
            const baseResponse = await this.useCase.execute(uuid, req);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(204).send(baseResponse);
        }
    }
}