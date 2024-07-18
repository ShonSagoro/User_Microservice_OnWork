export class CreateMessageRequest{
    message: string;
    chat_uuid: string;
    user_owner_uuid: string;
    
    constructor(message: string, chat_uuid: string, user_owner_uuid: string){
        this.message = message;
        this.chat_uuid = chat_uuid;
        this.user_owner_uuid = user_owner_uuid;
    }
}