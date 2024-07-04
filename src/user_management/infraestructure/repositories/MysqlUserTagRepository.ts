import sequelize from "../../../database/mysqldb";
import TagEntity from "../daos/TagEntity";
import { UserTagInterface } from "../../domain/ports/UserTagInterface";
import { UserTag } from "../../domain/entities/UserTag";
import UserTagEntity from "../daos/UserTagEntity";
import { UserTagDaoMapper } from "../mappers/UserTagDaoMapper";

export class MysqlUserTagRepository implements UserTagInterface {
 
    async deleteByUuidTag(uuid: string): Promise<boolean> {
        try {
            const result = await UserTagEntity.destroy({
                where: { tagUuid: uuid }
            });
            return result > 0;
        } catch (error) {
            console.error('Error deleting by tag UUID:', error);
            return false;
        }
    }

    async deleteByUuidUser(uuid: string): Promise<boolean> {
        try {
            const result = await UserTagEntity.destroy({
                where: { userUuid: uuid }
            });
            return result > 0;
        } catch (error) {
            console.error('Error deleting by user UUID:', error);
            return false;
        }
    }

    async findByUuidUser(uuid: string): Promise<UserTag[] | null> {
        try {
            const userTagEntities = await UserTagEntity.findAll({
                where: { userUuid: uuid },
                include: [{ model: TagEntity, as: 'tag' }]
            });
            if (!userTagEntities) return null;
            return userTagEntities.map(UserTagDaoMapper.toDomain);
        } catch (error) {
            console.error('Error finding by user UUID:', error);
            return null;
        }
    }

    async findByUuidTag(uuid: string): Promise<UserTag[] | null> {
        try {
            const userTagEntities = await UserTagEntity.findAll({
                where: { tagUuid: uuid },
                include: [{ model: UserTagEntity, as: 'user' }]
            });
            if (!userTagEntities) return null;
            return userTagEntities.map(UserTagDaoMapper.toDomain);
        } catch (error) {
            console.error('Error finding by tag UUID:', error);
            return null;
        }
    }

    async create(userTag: UserTag): Promise<UserTag | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                const userTagEntity = UserTagDaoMapper.toEntity(userTag);
                await userTagEntity.save({ transaction });
                return userTag;
            });
        } catch (error) {
            console.error('Error creating tag:', error);
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
