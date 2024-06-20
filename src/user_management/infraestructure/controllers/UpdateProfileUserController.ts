import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateProfileUserUseCase } from "../../application/use_case/UpdateProfileUserUseCase";

export class UpdateProfileUserController {
    constructor(readonly useCase: UpdateProfileUserUseCase) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        try {
            const baseResponse = await this.useCase.execute(uuid, req);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(204).send(baseResponse);
        }
    }
}