export class ChatResponse{
    uuid: string;
    from_user_uuid: string;
    to_user_uuid: string;
    createdAt: string;

    constructor(uuid:string, from_user_uuid: string, to_user_uuid: string, createdAt: string){
        this.uuid = uuid;
        this.from_user_uuid = from_user_uuid;
        this.to_user_uuid = to_user_uuid;
        this.createdAt = createdAt;
    }
}