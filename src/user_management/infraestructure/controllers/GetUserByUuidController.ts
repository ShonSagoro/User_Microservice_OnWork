import { Request, Response } from 'express';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UserResponse } from '../../application/dtos/response/UserResponse';
import { GetByUserCase } from '../../application/use_case/GetByUserCase';

export default class GetUserByUuidController {
    constructor(readonly getByUserCase: GetByUserCase) { }
    
    async execute(req: Request, res: Response): Promise<void> {
        const { uuid } = req.params;
        try {
            const user = await this.getByUserCase.executeByUUID(uuid);
            if (user) {
                const userResponse = new UserResponse(user);
                const baseResponse = new BaseResponse(userResponse, "User successfully found", true);
                res.status(200).json(baseResponse);
            } else {
                const baseResponse = new BaseResponse(null, "User not found", false);
                res.status(404).json(baseResponse);
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}