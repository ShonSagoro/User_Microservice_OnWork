export class RoleUserUpdateResponse{
    uuid: string;
    role: string;

    constructor(uuid:string,role: string){
        this.uuid = uuid;
        this.role = role;
    }
}