import { Message } from "../../domain/entities/message";
import MessageEntity from "../daos/MessageEntity";

export class MessageMapperDao {

    static toDomain(messageDao: MessageEntity): Message {
        let message = new Message(
            messageDao.dataValues.message,
            messageDao.dataValues.chat_uuid,
            messageDao.dataValues.user_owner_uuid,
            messageDao.dataValues.createdAt,
            messageDao.dataValues.updatedAt
        );
        message.uuid = messageDao.dataValues.uuid;
        return message;
    }

    static toEntity(message: Message): MessageEntity {
        return MessageEntity.build({
            uuid: message.uuid,
            message: message.message,
            chat_uuid: message.chat_uuid,
            user_owner_uuid: message.user_owner_uuid,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt
        });
    }
}