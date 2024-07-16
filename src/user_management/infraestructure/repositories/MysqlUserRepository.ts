import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import UserEntity from '../daos/UserEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { UserDaoMapper } from '../mappers/UserDaoMapper';
import sequelize from "../../../database/mysqldb";
import { Profile } from "../../domain/entities/Profile";
import { UserTag } from "../../domain/entities/UserTag";
import { MysqlUserTagRepository } from "./MysqlUserTagRepository";
import { MysqlTagRepository } from "./MysqlTagRepository";
import { Tag } from "../../domain/entities/Tag";
import TagEntity from "../daos/TagEntity";
import { TokenAuthServices } from "../services/TokenServices";
import { ByEncryptServices } from "../services/ByEncryptServices";

export class MysqlUserRepository implements UserInterface {
    private _userTagRepository: MysqlUserTagRepository | null = null;
    private _tagRepository: MysqlTagRepository | null = null;
    private _encryptionService: EncryptService | null = null;
    private _tokenServices: TokenServices | null = null;

    get encryptionService(): EncryptService {
        if (!this._encryptionService) {
            this._encryptionService = new ByEncryptServices();
        }
        return this._encryptionService;
    }

    get tokenServices(): TokenServices {
        if (!this._tokenServices) {
            this._tokenServices = new TokenAuthServices();
        }
        return this._tokenServices;
    }

    get userTagRepository(): MysqlUserTagRepository {
        if (!this._userTagRepository) {
            this._userTagRepository = new MysqlUserTagRepository();
        }
        return this._userTagRepository;
    }

    get tagRepository(): MysqlTagRepository {
        if (!this._tagRepository) {
            this._tagRepository = new MysqlTagRepository();
        }
        return this._tagRepository;
    }

    async find_all_tags_by_user_uuid(uuid: string): Promise<Tag[] | null> {
        try {
            return await this.tagRepository.findByUserUUID(uuid);
        } catch (error) {
            console.error('Error finding all tags by user UUID:', error);
            return null;
        }
    }


    async refresh_token(uuid: string): Promise<User | null> {
        try {
            let user = await this.findByUUID(uuid);
            if (!user) return null;
            if (!user.status.isLoggin) return null;
            return user;

        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }

    async list_providers(transaction?: any): Promise<User[] | null> {
        try {
            const userEntities = await UserEntity.findAll({
                where: {
                    role: 'SERVICE_PROVIDER'
                },
                transaction
            });
            if (!userEntities) return null;
            const users = await Promise.all(userEntities.map(async (userEntity) => {
                let tagsEntities = await this.findTagsByUser(userEntity.uuid);
                return UserDaoMapper.toDomain(userEntity, tagsEntities);
            }));
            return users;
        } catch (error) {
            console.error('Error listing users:', error);
            return null;
        }
    }

    async sign_up_provider(user: User): Promise<User | null> {
        try {
            user.credentials.password = await this.encryptionService.execute(user.credentials.password);
            let userExists = await this.findByEmail(user.credentials.email);
            if (userExists) return null;
            return await this.withTransaction(async (transaction: any) => {
                user.status.token = await this.tokenServices.generateToken();
                const userEntity = UserDaoMapper.toEntity(user);
                await userEntity.save({ transaction });
                return user;
            });
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async sign_in_provider(email: string, password: string): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                let user = await this.findByEmail(email, transaction);
                if (!user || user.role != "SERVICE_PROVIDER") return null;
                if (await this.encryptionService.compare(password, user.credentials.password)) {
                    await UserEntity.update({ isLogging: true }, { where: { uuid: user.uuid }, transaction });

                    return user;
                } else {
                    return null;
                }
            });
        } catch (error) {
            console.error('Error signing in:', error);
            return null;
        }
    }


    async findByEmail(email: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findOne({ where: { email }, transaction })
                .then(async (userEntity) => {
                    if (!userEntity) return null;
                    let tagsEntities = await this.findTagsByUser(userEntity.uuid);
                    return UserDaoMapper.toDomain(userEntity, tagsEntities)
                });
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }



    async find_by_tag_uuid(uuid: string): Promise<User[] | null> {
        try {
            const userTags: UserTag[] | null = await this.userTagRepository.findByUuidTag(uuid);
            if (!userTags) return null;
            const users = userTags.map((userTag: UserTag) => userTag.user_uuid);
            const userEntities = await UserEntity.findAll({ where: { uuid: users } });
            const tags = userTags.map(userTag => userTag.tag_uuid);
            let tagsEntities = await TagEntity.findAll({ where: { uuid: tags } });
            return userEntities.map(userEntity => UserDaoMapper.toDomain(userEntity, tagsEntities));
        } catch (error) {
            console.error('Error finding by tag UUID:', error);
            return null;
        }
    }

    async findByUUID(uuid: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findByPk(uuid, {
                transaction
            }).then(async (userEntity) => {
                if (!userEntity) return null;
                let tagsEntities = await this.findTagsByUser(uuid);
                return UserDaoMapper.toDomain(userEntity, tagsEntities);
            });
        } catch (error) {
            console.error('Error finding user by UUID:', error);
            return null;
        }
    }

    async findTagsByUser(uuid: string): Promise<TagEntity[]> {
        try {
            let userTags: UserTag[] | null = await this.userTagRepository.findByUuidUser(uuid);
            if (!userTags) return [];
            const tags = userTags.map(userTag => userTag.tag_uuid);
            let tagsEntities = await TagEntity.findAll({ where: { uuid: tags } });
            return tagsEntities;
        } catch (error) {
            console.error('Error getting tags by user:', error);
            return [];
        }
    }


    async find_by_ubication(longitude: number, latitude: number): Promise<User[] | null> {
        try {
            const userEntities = await UserEntity.findAll({
                where: {
                    latitude: latitude,
                    longitude: longitude
                },
            });
            const users = await Promise.all(userEntities.map(async (userEntity) => {
                let tagsEntities = await this.findTagsByUser(userEntity.uuid);
                return UserDaoMapper.toDomain(userEntity, tagsEntities);
            }));
            return users;
        } catch (error) {
            console.error('Error listing users:', error);
            return null;
        }
    }

    async list(transaction ?: any): Promise < User[] | null > {
    try {
        const userEntities = await UserEntity.findAll({
            transaction,
        });
        const users = await Promise.all(userEntities.map(async (userEntity) => {
            let tagsEntities = await this.findTagsByUser(userEntity.uuid);
            return UserDaoMapper.toDomain(userEntity, tagsEntities);
        }));
        return users;
    } catch(error) {
        console.error('Error listing users:', error);
        return null;
    }
}

    async delete (uuid: string, transaction ?: any): Promise < boolean > {
    try {
        await this.userTagRepository.deleteByUuidUser(uuid);
        await UserEntity.destroy({ where: { uuid }, transaction });
        return true;
    } catch(error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

    async update(uuid: string, user: User, transaction ?: any): Promise < User | null > {
    try {
        const existingUser = await this.findByUUID(uuid);
        if(!existingUser) return null;

        const updateData: Partial<UserEntity> = UserDaoMapper.toUpdateEntity(user, uuid);

        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update(
                {
                    email: updateData.email,
                    name: updateData.name,
                    lastName: updateData.lastName,
                    phoneNumber: updateData.phoneNumber,
                    birthday: updateData.birthday,
                    region: updateData.region,

                }, {
                where: { uuid },
                transaction
            });
        });

        return await this.findByUUID(uuid, transaction);
    } catch(error) {
        console.error('Error updating user:', error);
        return null;
    }
}
    

    

    async sign_up(user: User): Promise < User | null > {
    try {
        user.credentials.password = await this.encryptionService.execute(user.credentials.password);
        let userExists = await this.findByEmail(user.credentials.email);
        if(userExists) return null;
        return await this.withTransaction(async (transaction: any) => {
            user.status.token = await this.tokenServices.generateToken();
            const userEntity = UserDaoMapper.toEntity(user);
            await userEntity.save({ transaction });
            return user;
        });
    } catch(error) {
        console.error('Error creating user:', error);
        return null;
    }
}

    async sign_in(email: string, password: string): Promise < User | null > {
    try {
        return await this.withTransaction(async (transaction: any) => {
            let user = await this.findByEmail(email, transaction);
            if (!user) return null;
            if (await this.encryptionService.compare(password, user.credentials.password)) {
                user.status.isLoggin = true;
                await UserEntity.update({ isLogging: true }, { where: { uuid: user.uuid }, transaction });
                return user;
            } else {
                return null;
            }
        });
    } catch(error) {
        console.error('Error signing in:', error);
        return null;
    }
}

    async sign_out(uuid: string, transaction ?: any): Promise < boolean > {
    try {
        return await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ isLogging: false }, { where: { uuid }, transaction });
            return true;
        });
    } catch(error) {
        console.error('Error signing out:', error);
        return false;
    }
}

    async update_user_verified_at(uuid: string, token: string): Promise < boolean > {
    try {
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return false;
        return await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ verifiedAt: new Date(), verified: true }, { where: { uuid }, transaction });
            return true;
        });
    } catch(error) {
        console.error('Error updating user verified at:', error);
        return false;
    }
}

    async update_password(uuid: string, old_password: string, new_password: string): Promise < User | null > {
    try {
        new_password = await this.encryptionService.execute(new_password);
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return null;
        if(!await this.encryptionService.compare(old_password, userExists.credentials.password)) return null;
        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ password: new_password }, { where: { uuid }, transaction });
        });
        userExists.credentials.password = new_password;
        return userExists;
    } catch(error) {
        console.error('Error updating user password:', error);
        return null;
    }
}

    async update_role(uuid: string, role: string): Promise < User | null > {
    try {
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return null;
        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ role: role }, { where: { uuid }, transaction });
        });
        const updatedUser = await this.findByUUID(uuid);
        return updatedUser;
    } catch(error) {
        console.error('Error updating user plan:', error);
        return null;
    }
}

    async update_plan(uuid: string, plan: string): Promise < User | null > {
    try {
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return null;
        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ plan: plan }, { where: { uuid }, transaction });
        });
        const updatedUser = await this.findByUUID(uuid);
        return updatedUser;
    } catch(error) {
        console.error('Error updating user plan:', error);
        return null;
    }
}

    async update_profile(uuid: string, profile: Profile): Promise < User | null > {
    try {
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return null;
        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ description: profile.description, company: profile.company }, { where: { uuid }, transaction });
        });
        const updatedUser = await this.findByUUID(uuid);
        return updatedUser;
    } catch(error) {
        console.error('Error updating user plan:', error);
        return null;
    }
}

    async update_ubication(uuid: string, longitude: number, latitude: number): Promise < User | null > {
    try {
        let userExists = await this.findByUUID(uuid);
        if(!userExists) return null;
        await this.withTransaction(async (transaction: any) => {
            await UserEntity.update({ latitude: latitude, longitude: longitude }, { where: { uuid }, transaction });
        });
        const updatedUser = await this.findByUUID(uuid);
        return updatedUser;
    } catch(error) {
        console.error('Error updating user plan:', error);
        return null;
    }
}

    private async withTransaction(callback: (transaction: any) => Promise<any>): Promise < any > {
    const transaction = await sequelize.transaction();
    try {
        const result = await callback(transaction);
        await transaction.commit();
        return result;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}
}
