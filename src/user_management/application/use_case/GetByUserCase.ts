import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";


export class GetByUserCase {
    constructor(readonly userInteface: UserInterface) {}

    async executeByEmail(email: string): Promise<BaseResponse> {
        let result = await this.userInteface.findByEmail(email);
        if (result) {
            return new BaseResponse(result, 'User found', true, 200);
        } else {
            return new BaseResponse(null, 'User not found', false, 404);
        }
    }

    async executeByUUID(uuid:string): Promise<BaseResponse> {
        let result = this.userInteface.findByUUID(uuid);
        if (result) {
            return new BaseResponse(result, 'User found', true, 200);
        } else {
            return new BaseResponse(null, 'User not found', false, 404);
        }
    }
}