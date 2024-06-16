export class UpdateProfileUserRequest{
    description: string;
    company: string;

    constructor(description: string, company: string){
        this.description = description;
        this.company = company;
    }
}