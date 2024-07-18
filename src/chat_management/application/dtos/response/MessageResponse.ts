export class MessageResponse{
    uuid: string;
    message: string;
    chat_uuid: string;
    user_owner_uuid: string;
    createdAt: string;
    updatedAt: string;
    
    constructor(uuid:string, message: string, chat_uuid: string, user_owner_uuid: string, createdAt: string, updatedAt: string){
        this.uuid = uuid;
        this.message = message;
        this.chat_uuid = chat_uuid;
        this.user_owner_uuid = user_owner_uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}