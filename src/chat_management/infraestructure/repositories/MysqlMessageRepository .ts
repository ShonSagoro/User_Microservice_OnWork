import { Message } from "../../domain/entities/message";
import { MessageInterface } from "../../domain/port/message_interface";
import MessageEntity from "../daos/MessageEntity";
import { MessageMapperDao } from "../mappers/MessageMapperDao";

export class MysqlMessageRepository implements MessageInterface {

    async create(message: Message): Promise<Message | null> {
        try {
            const messageEntity = MessageMapperDao.toEntity(message);
            await messageEntity.save();
            return MessageMapperDao.toDomain(messageEntity);
        } catch (error) {
            console.error('Error creating message:', error);
            return null;
        }
    }

    async find_by_chat(chat_uuid: string): Promise<Message[] | null> {
        try {
            const messageEntities = await MessageEntity.findAll({ where: { chat_uuid } });
            return messageEntities.map((messageEntity: MessageEntity) => MessageMapperDao.toDomain(messageEntity));
        } catch (error) {
            console.error('Error finding messages by chat UUID:', error);
            return null;
        }
    }

    async delete(uuid: string): Promise<boolean> {
        try {
            const result = await MessageEntity.destroy({ where: { uuid } });
            return result > 0;
        } catch (error) {
            console.error('Error deleting message:', error);
            return false;
        }
    }
}
