import { Message } from "../entities/message";

export interface MessageInterface {
    create(message: Message): Promise<Message | null>;
    find_by_chat(user_uuid: string): Promise<Message[] | null>;
    list(): Promise<Message[] | null>;
    delete(uuid: string): Promise<boolean>;
}