import TagEntity from '../daos/TagEntity';
import { Tag } from '../../domain/entities/Tag';

export class TagDaoMapper {
    static toDomain(tagEntity: TagEntity): Tag{
        let tag = new Tag(tagEntity.dataValues.title, tagEntity.dataValues.description);
        tag.uuid = tagEntity.dataValues.uuid;
        return tag;
    }

    static toUpdateEntity(tag: Tag, uuid: string): TagEntity {
        return TagEntity.build({
            uuid: uuid,
            title: tag.title,
            description: tag.description
        }); 
    }
    
    static toEntity(tag: Tag): TagEntity {
        return TagEntity.build({
                uuid: tag.uuid,
                title: tag.title,
                description: tag.description
        });
    }
}

