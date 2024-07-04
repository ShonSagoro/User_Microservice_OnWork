export class UserTagResponse {
    uuid: string;
    uuidUser: string;
    uuidTag: string;

    constructor(uuid: string, uuidUser: string, uuidTag: string) {
        this.uuid = uuid;
        this.uuidUser = uuidUser;
        this.uuidTag = uuidTag;
    }
}