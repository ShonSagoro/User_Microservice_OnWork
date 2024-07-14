
import sequelize from "../../../database/mysqldb";
import { TagInterface } from "../../domain/ports/TagInterface";
import { Tag } from "../../domain/entities/Tag";
import TagEntity from "../daos/TagEntity";
import { TagDaoMapper } from "../mappers/TagDaoMapper";
import { MysqlUserTagRepository } from "./MysqlUserTagRepository";
import { UserTag } from "../../domain/entities/UserTag";

export class MysqlTagRepository implements TagInterface {

    private _userTagRepository: MysqlUserTagRepository | null = null;

    get userTagRepository(): MysqlUserTagRepository {
        if (!this._userTagRepository) {
            this._userTagRepository = new MysqlUserTagRepository();
        }
        return this._userTagRepository;
    }

    async findByUUIDEntity(uuid: string): Promise<TagEntity | null> {
        try {
            return await TagEntity.findByPk(uuid);
        } catch (error) {
            console.error('Error finding by UUID:', error);
            return null;
        }
    }

    async findByUserUUID(uuid: string): Promise<Tag[]> {
        try {
            const userTags: UserTag[] | null = await this.userTagRepository.findByUuidUser(uuid);
            if (!userTags || userTags.length === 0) return [];
            const tags = userTags.map((userTag: UserTag) => userTag.tag_uuid);
            const tagEntities = await TagEntity.findAll({ where: { uuid: tags } });
            return tagEntities.map(tagEntity => TagDaoMapper.toDomain(tagEntity));
        } catch (error) {
            console.error('Error finding by user UUID:', error);
            return [];
        }
    }
    
    async create(tag: Tag): Promise<Tag | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                const tagEntity = TagDaoMapper.toEntity(tag);
                await tagEntity.save({ transaction });
                return tag;
            });
        } catch (error) {
            console.error('Error creating tag:', error);
            return null;
        }
    }

    async delete(uuid: string, transaction?: any): Promise<boolean> {
        try {
            await this.userTagRepository.deleteByUuidTag(uuid);
            await TagEntity.destroy({ where: { uuid }, transaction });
            return true;
        } catch (error) {
            console.error('Error deleting tag:', error);
            return false;
        }
    }

    async update(uuid: string, tag: Tag, transaction?: any): Promise<Tag | null> {
        try {
            const existingTag = await this.findByUUID(uuid);
            if (!existingTag) return null;
    
            const updateData: Partial<TagEntity> = TagDaoMapper.toUpdateEntity(tag, uuid);
            return await this.withTransaction(async (transaction: any) => {
                await TagEntity.update({
                    title: updateData.title,
                    description: updateData.description,
                }, { where: { uuid }, transaction });
                return await this.withTransaction(async (transaction: any) => { 
                    await TagEntity.update(updateData, { where: { uuid }, transaction }); 
                    tag.uuid = uuid;
                    return tag; 
                });
            });
        } catch (error) {
            console.error('Error updating tag:', error);
            return null;
        }
    }

    async list(transaction?: any): Promise<Tag[] | null> {
        try {
            const tagEntities = await TagEntity.findAll({ transaction });
            return tagEntities.map(tagEntity => TagDaoMapper.toDomain(tagEntity));
        } catch (error) {
            console.error('Error listing tags:', error);
            return null;
        }
    }

    async findByUUID(uuid: string, transaction?: any): Promise<Tag | null> {
        try {
            return await TagEntity.findByPk(uuid, { transaction })
                .then(tagEntity => tagEntity ? TagDaoMapper.toDomain(tagEntity) : null);
        } catch (error) {
            console.error('Error finding user by UUID:', error);
            return null;
        }
    }

    private async withTransaction(callback: (transaction: any) => Promise<any>): Promise<any> {
        const transaction = await sequelize.transaction();
        try {
            const result = await callback(transaction);
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
