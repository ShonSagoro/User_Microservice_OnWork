export class CreateChatRequest{
    from_user_uuid: string;
    to_user_uuid: string;

    constructor(from_user_uuid: string, to_user_uuid: string){
        this.from_user_uuid = from_user_uuid;
        this.to_user_uuid = to_user_uuid;
    }
}