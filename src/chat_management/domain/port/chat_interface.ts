import { Chat } from "../entities/chat";

export default interface ChatInterface {
    create(chat: Chat): Promise<Chat | null>;
    delete(uuid: string): Promise<boolean>;
    find(uuid: string): Promise<Chat | null>;
    findByUser(uuid:string): Promise<Chat[] | null>;
}