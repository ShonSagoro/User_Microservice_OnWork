import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class UpdatePlanUserUseCase {
    constructor(private userInterface: UserInterface) { }
    async execute(uuid: string): Promise<BaseResponse> {
        //TODO: reviasr si pago o no.
        let pago = true;
        if (!pago) {
            this.userInterface.update_plan(uuid, 'FREE');
            return new BaseResponse(null, 'Payment required', false, 402);
        }
        this.userInterface.update_plan(uuid, 'LEADER');
        return new BaseResponse(null, 'Plan updated successfully', true, 201);
    }
}