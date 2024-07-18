import { v4 as uuidv4 } from 'uuid';

export class Chat{
    public uuid: string;
    public from_user_uuid: string;
    public to_user_uuid: string;
    public createdAt: string;

    constructor(from_user_uuid: string, to_user_uuid: string, createdAt: string){
        this.uuid = uuidv4();
        this.from_user_uuid = from_user_uuid;
        this.to_user_uuid = to_user_uuid;
        this.createdAt = createdAt;
    }
}