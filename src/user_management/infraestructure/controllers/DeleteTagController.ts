import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { DeleteTagUseCase } from "../../application/use_case/DeleteTagUseCase";

export class DeleteTagController {
  constructor(readonly useCase: DeleteTagUseCase) {}

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