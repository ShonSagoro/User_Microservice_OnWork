import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateImageUserUseCase } from "../../application/use_case/UpdateImageUserUseCase";
import { StorageService } from "../../domain/services/StorageServices";

export class UpdateImageUserController {
    constructor(readonly useCase: UpdateImageUserUseCase, readonly storageService: StorageService) { }

    async execute(req: any, res: Response) {
        const { uuid } = req.params;
        const file = req.file;
        try {
            const fileBuffer = file.buffer;
            const fileName = file.originalname;
            const mimeType = file.mimetype;
            let url_image = await this.storageService.execute(fileBuffer, fileName, mimeType);
            const baseResponse = await this.useCase.execute(uuid, url_image);
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(500).send(baseResponse);
        }
    }
}