import UserTagEntity from '../daos/UserTagEntity';
import { UserTag } from '../../domain/entities/UserTag';

export class UserTagDaoMapper {
    static toDomain(userTagEntity: UserTagEntity): UserTag{
        let userTag = new UserTag(userTagEntity.dataValues.user_uuid, userTagEntity.dataValues.tag_uuid);
        userTag.uuid = userTagEntity.dataValues.uuid;
        return userTag;
    }

    static toEntity(userTag: UserTag): UserTagEntity {
        return UserTagEntity.build({
                uuid: userTag.uuid,
                user_uuid: userTag.user_uuid,
                tag_uuid: userTag.tag_uuid
        });
    }
}

