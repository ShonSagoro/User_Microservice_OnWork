import { UserResponse } from './../../application/dtos/response/UserResponse';
import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { ListUsersCase } from '../../application/use_case/ListUsersCase';

export class ListUsersController {
    constructor(readonly listUsersCase: ListUsersCase) { }

    async execute(req: Request, res: Response) {
        try {
            let users = await this.listUsersCase.execute();
            let userResponse = users ? users.map((user) => new UserResponse(user)) : [];
            const baseReponse = new BaseResponse(userResponse, "Users successfully found", true);
            res.status(200).json(baseReponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(204).send(baseResponse);
        }
    }
}