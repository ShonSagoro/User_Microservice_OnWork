import { User } from "../../domain/entities/User";
import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { Plan } from "../../domain/entities/enums/Plan";

export class PaymentUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, req: Request): Promise<BaseResponse> {
        //TODO: hacer la llamada al sistema de pagos por rabbit, y confirmar el pago, debe ser true
        let plan = UserDtoMapper.toUpdatePlanUserRequest(req);
        if (!plan) {
            return new BaseResponse(null, 'Bad request or the plan not exist', false, 400);
        }
        let result = await this.userInterface.update_plan(uuid, Plan[plan.plan]);
        if (result) {
            let response = UserDtoMapper.toUpdatePlanUserResponse(result);
            return new BaseResponse(response, 'Plan updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Plan not updated', false, 400);
    }
}