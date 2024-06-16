export class TokenUserReponse {
    uuid: string
    token: string;
    
    constructor(uuid: string, token: string) {
        this.uuid = uuid;
        this.token = token;
    }
}