export class PlanUserUpdateResponse{
    uuid: string;
    plan: string;

    constructor(uuid:string,plan: string){
        this.uuid = uuid;
        this.plan = plan;
    }
}