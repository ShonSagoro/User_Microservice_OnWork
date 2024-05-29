import { DeleteUserHistoryCase } from './../../application/use_case/DeleteUserHistoryCase';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";

export class DeleteUserHistoryController{
    constructor(readonly deleteUserHistoryCase: DeleteUserHistoryCase) { }

    async execute(req: any, res: any) {
        const uuid = req.params.uuid;
        try {
            await this.deleteUserHistoryCase.execute(uuid);
            let baseResponse = new BaseResponse("Successful","User history deleted", true);
            res.status(200).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}