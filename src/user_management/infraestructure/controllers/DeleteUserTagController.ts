import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { DeleteUserUseCase } from "../../application/use_case/DeleteUserUseCase";
import { DeleteTagUserUseCase } from "../../application/use_case/DeleteTagUserUseCase";

export class DeleteUserTagController {
  constructor(readonly useCase: DeleteTagUserUseCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      const baseReponse = await this.useCase.execute(uuid);
      baseReponse.apply(res);
    } catch (error) {
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false, 500);
      baseReponse.apply(res);
    }
  }
}