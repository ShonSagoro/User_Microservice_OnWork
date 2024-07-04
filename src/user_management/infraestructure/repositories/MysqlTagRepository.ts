// MysqlUserRepository.ts

import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import UserEntity from '../daos/UserEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { UserDaoMapper } from '../mappers/UserDaoMapper';
import sequelize from "../../../database/mysqldb";
import { Profile } from "../../domain/entities/Profile";
import { TagInterface } from "../../domain/ports/TagInterface";
import { Tag } from "../../domain/entities/Tag";
import TagEntity from "../daos/TagEntity";
import { TagDaoMapper } from "../mappers/TagDaoMapper";

export class MysqlTagRepository implements TagInterface {
    
    
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
            await UserEntity.destroy({ where: { uuid }, transaction });
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
                await TagEntity.update(updateData, { where: { uuid }, transaction });
                return await this.withTransaction(async (transaction: any) => { 
                    await TagEntity.update(updateData, { where: { uuid }, transaction }); 
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
