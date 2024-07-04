import TagEntity from '../daos/TagEntity';
import { Tag } from '../../domain/entities/Tag';
import UserTagEntity from '../daos/UserTagEntity';
import { UserTag } from '../../domain/entities/UserTag';

export class UserTagDaoMapper {
    static toDomain(userTagEntity: UserTagEntity): UserTag{
        let userTag = new UserTag(userTagEntity.dataValues.userid, userTagEntity.dataValues.tagid);
        userTag.uuid = userTagEntity.dataValues.uuid;
        return userTag;
    }

    static toEntity(userTag: UserTag): UserTagEntity {
        return UserTagEntity.build({
                uuid: userTag.uuid,
                userid: userTag.userid,
                tagid: userTag.tagid
        });
    }
}

