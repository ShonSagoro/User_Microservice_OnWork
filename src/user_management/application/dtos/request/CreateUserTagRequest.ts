export class CreateUserTagRequest {
    uuidUser: string;
    uuidTag: string;

    constructor(uuidUser: string, uuidTag: string) {
        this.uuidUser = uuidUser;
        this.uuidTag = uuidTag;
    }
}