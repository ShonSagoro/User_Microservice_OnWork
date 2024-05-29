import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { ActivateUserCase } from "../../application/use_case/ActivateUserCase";

export class ActivateUserController {
  constructor(readonly activateUserCase: ActivateUserCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      await this.activateUserCase.execute(uuid);
      const baseReponse = new BaseResponse("Success", "User successfully ACTIVATED", true);
      res.status(200).send(baseReponse);
    } catch (error) {
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false);
      res.status(204).send(baseReponse);
    }
  }
}