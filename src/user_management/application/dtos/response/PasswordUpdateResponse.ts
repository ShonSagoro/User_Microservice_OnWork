export class PasswordUpdateResponse{
    uuid: string;
    message: string;

    constructor(uuid:string, message: string){
        this.uuid = uuid;
        this.message = message;
    }
}