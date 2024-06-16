export class ProfileUserUpdateRespose{
    uuid: string;
    description: string;
    company: string;

    constructor(uuid: string, description: string, company: string){
        this.uuid = uuid;
        this.description = description;
        this.company = company;
    }
}