import { UserResponse } from "./UserResponse";

export class TokenUserReponse {
    uuid: string;
    user: UserResponse;
    jwt_token: string;


    constructor(uuid: string, user: UserResponse, jwt_token: string) {
        this.uuid = uuid;
        this.user = user;
        this.jwt_token = jwt_token;
    }
}