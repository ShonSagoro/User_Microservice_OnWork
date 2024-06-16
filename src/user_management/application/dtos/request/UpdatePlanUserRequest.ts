import { Plan } from "../../../domain/entities/enums/Plan";

export class UpdatePlanUserRequest{
    plan: Plan;

    constructor(plan: string){
        this.plan = Plan[plan as keyof typeof Plan];
    }
}