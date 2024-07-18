import { v4 as uuidv4 } from 'uuid';

export class Message{
    public uuid: string;
    public message: string;
    public chat_uuid: string;
    public user_owner_uuid: string;
    public createdAt: string;
    public updatedAt: string;
    
    constructor(message: string, chat_uuid: string, user_owner_uuid: string, createdAt: string, updatedAt: string){
        this.uuid = uuidv4();
        this.message = message;
        this.chat_uuid = chat_uuid;
        this.user_owner_uuid = user_owner_uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}