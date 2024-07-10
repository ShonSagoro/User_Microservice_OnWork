import sequelize from "../../../database/mysqldb";
import TagEntity from "../daos/TagEntity";
import { UserTagInterface } from "../../domain/ports/UserTagInterface";
import { UserTag } from "../../domain/entities/UserTag";
import UserTagEntity from "../daos/UserTagEntity";
import { UserTagDaoMapper } from "../mappers/UserTagDaoMapper";
import UserEntity from "../daos/UserEntity";
import { MysqlTagRepository } from "./MysqlTagRepository";
import { MysqlUserRepository } from "./MysqlUserRepository";

export class MysqlUserTagRepository implements UserTagInterface {
    private _userRepository: MysqlUserRepository | null = null;

    private _tagRepository: MysqlTagRepository | null = null;

    get tagRepository(): MysqlTagRepository {
        if (!this._tagRepository) {
            this._tagRepository = new MysqlTagRepository();
        }
        return this._tagRepository;
    }

    get userRepository(): MysqlUserRepository {
        if (!this._userRepository) {
            this._userRepository = new MysqlUserRepository();
        }
        return this._userRepository;
    }

    async delete(uuid: string): Promise<boolean> {
        try {
            const result = await UserTagEntity.destroy({
                where: { uuid }
            });
            return result > 0;
        } catch (error) {
            console.error('Error deleting tag:', error);
            return false;
        }
    }
 
    async deleteByUuidTag(uuid: string): Promise<boolean> {
        try {
            const result = await UserTagEntity.destroy({
                where: { TagUuid: uuid }
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
                where: { UserUuid: uuid }
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
                where: { user_uuid: uuid },
            });
            console.log(userTagEntities);
            if (!userTagEntities) return null;
            return userTagEntities.map(UserTagDaoMapper.toDomain);
        } catch (error) {
            console.error('Error finding by user UUID:', error);
            return null;
        }
    }

    async findByUuidTag(uuid: string): Promise<UserTag[] | null> {
        try {
            console.log('findByUuidTag', uuid);
            const userTagEntities = await UserTagEntity.findAll({
                where: { tag_uuid: uuid },
            });
            console.log('findByUuidTag', userTagEntities);
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
