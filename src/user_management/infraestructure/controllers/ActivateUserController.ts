import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { ActivateUserUseCase } from "../../application/use_case/ActivateUserUseCase";

export class ActivateUserController {
  constructor(readonly useCase: ActivateUserUseCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      let baseReponse = await this.useCase.execute(uuid, req);
      baseReponse.apply(res);
    } catch (error) {
      console.error(error);
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false, 500);
      baseReponse.apply(res);
    }
  }
}