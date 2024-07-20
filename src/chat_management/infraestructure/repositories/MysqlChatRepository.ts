import { Chat } from "../../domain/entities/chat";
import ChatInterface from "../../domain/port/chat_interface";
import ChatEntity from "../daos/ChatEntity";
import { ChatMapperDao } from "../mappers/ChatMapperDao";


export class MysqlChatRepository implements ChatInterface {

    async create(chat: Chat): Promise<Chat | null> {
        try {
            const chatEntity = ChatMapperDao.toEntity(chat);
            await chatEntity.save();
            return ChatMapperDao.toDomain(chatEntity);
        } catch (error) {
            console.error('Error creating chat:', error);
            return null;
        }
    }

    async delete(uuid: string): Promise<boolean> {
        try {
            const result = await ChatEntity.destroy({ where: { uuid } });
            return result > 0;
        } catch (error) {
            console.error('Error deleting chat:', error);
            return false;
        }
    }

    async find(uuid: string): Promise<Chat | null> {
        try {
            const chatEntity = await ChatEntity.findByPk(uuid);
            return chatEntity ? ChatMapperDao.toDomain(chatEntity) : null;
        } catch (error) {
            console.error('Error finding chat by UUID:', error);
            return null;
        }
    }

    async findByUser(uuid: string): Promise<Chat[] | null> {
        try {
            const chatEntities = await ChatEntity.findAll({ where: { from_user_uuid: uuid } });
            return chatEntities.map(chatEntity => ChatMapperDao.toDomain(chatEntity));
        } catch (error) {
            console.error('Error finding chats by user UUID:', error);
            return null;
        }
    }
}
