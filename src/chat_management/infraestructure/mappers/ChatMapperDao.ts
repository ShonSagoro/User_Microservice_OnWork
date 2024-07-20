import { Chat } from "../../domain/entities/chat";
import ChatEntity from "../daos/ChatEntity";

export class ChatMapperDao {

    static toDomain(dao: ChatEntity): Chat {
        let chat= new Chat(
            dao.dataValues.from_user_uuid,
            dao.dataValues.to_user_uuid,
            dao.dataValues.createdAt
        );
        chat.uuid = dao.dataValues.uuid;
        return chat;
    }

    static toEntity(domain: Chat): ChatEntity {
        return ChatEntity.build({
            uuid: domain.uuid,
            from_user_uuid: domain.from_user_uuid,
            to_user_uuid: domain.to_user_uuid,
            createdAt: domain.createdAt
        });
    }
}