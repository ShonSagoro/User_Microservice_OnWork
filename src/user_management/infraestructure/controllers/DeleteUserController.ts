import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { DeleteUserCase } from "../../application/use_case/DeleteUserCase";

export class DeleteUserController {
  constructor(readonly deleteUserCase: DeleteUserCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      await this.deleteUserCase.execute(uuid);
      const baseReponse = new BaseResponse("Success", "User successfully Deleted", true);
      res.status(200).send(baseReponse);
    } catch (error) {
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false);
      res.status(204).send(baseReponse);
    }
  }
}