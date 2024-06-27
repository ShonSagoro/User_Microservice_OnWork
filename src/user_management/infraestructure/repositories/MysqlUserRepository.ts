// MysqlUserRepository.ts

import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import UserEntity from '../daos/UserEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { UserDaoMapper } from '../mappers/UserDaoMapper';
import sequelize from "../../../database/mysqldb";
import { Profile } from "../../domain/entities/Profile";

export class MysqlUserRepository implements UserInterface {

    constructor(readonly encryptionService: EncryptService, readonly tokenServices: TokenServices) {
    }
    async list_providers(transaction?: any): Promise<User[] | null> {
        try {
            const userEntities = await UserEntity.findAll({ 
                where: {
                    role: 'SERVICE_PROVIDER'
                },
                transaction 
            });
            return userEntities.map(userEntity => UserDaoMapper.toDomain(userEntity));
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
    
    async sing_in_provider(email: string, password: string): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                let user = await this.findByEmail(email, transaction);
                if (!user || user.role != "SERVICE_PROVIDER") return null;
                if (await this.encryptionService.compare(password, user.credentials.password)) {
                    return user;
                } else {
                    return null;
                }
            });
        } catch (error) {
            console.error('Error signing in:', error);
            return null;
        }    }


    async findByEmail(email: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findOne({ where: { email }, transaction })
                .then(userEntity => userEntity ? UserDaoMapper.toDomain(userEntity) : null);
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }


    async findByUUID(uuid: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findByPk(uuid, { transaction })
                .then(userEntity => userEntity ? UserDaoMapper.toDomain(userEntity) : null);
        } catch (error) {
            console.error('Error finding user by UUID:', error);
            return null;
        }
    }

    async delete(uuid: string, transaction?: any): Promise<boolean> {
        try {
            await UserEntity.destroy({ where: { uuid }, transaction });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }

    async update(uuid: string, user: User, transaction?: any): Promise<User | null> {
        try {
            const existingUser = await this.findByUUID(uuid);
            if (!existingUser) return null;
    
            const updateData: Partial<UserEntity> = UserDaoMapper.toUpdateEntity(user, uuid);
            return await this.withTransaction(async (transaction: any) => {
                await UserEntity.update(updateData, { where: { uuid }, transaction });
                return await this.withTransaction(async (transaction: any) => { 
                    await UserEntity.update(updateData, { where: { uuid }, transaction }); 
                    return user; 
                });
            });
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }

    async list(transaction?: any): Promise<User[] | null> {
        try {
            const userEntities = await UserEntity.findAll({ transaction });
            return userEntities.map(userEntity => UserDaoMapper.toDomain(userEntity));
        } catch (error) {
            console.error('Error listing users:', error);
            return null;
        }
    }

    async sign_up(user: User): Promise<User | null> {
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

    async sign_in(email: string, password: string): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                let user = await this.findByEmail(email, transaction);
                if (!user) return null;
                if (await this.encryptionService.compare(password, user.credentials.password)) {
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

    async sign_out(uuid: string, transaction?: any): Promise<boolean> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                return true;
            });
        } catch (error) {
            console.error('Error signing out:', error);
            return false;
        }
    }

    async update_user_verified_at(uuid: string, token:string): Promise<boolean> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return false;
            return await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ verifiedAt: new Date(), verified: true}, { where: { uuid }, transaction });
                return true;
            });
        } catch (error) {
            console.error('Error updating user verified at:', error);
            return false;
        }
    }

    async update_password(uuid: string, old_password: string, new_password: string): Promise<User|null> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return null;
            if (!await this.encryptionService.compare(old_password, userExists.credentials.password)) return null;
            await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ password: new_password}, { where: { uuid }, transaction });
            });
            userExists.credentials.password = new_password;
            return userExists;
        } catch (error) {
            console.error('Error updating user password:', error);
            return null;
        }    
    }

    async update_role(uuid: string, role: string): Promise<User|null> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return null;
            await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ role: role}, { where: { uuid }, transaction });
            });
            const updatedUser = await this.findByUUID(uuid);
            return updatedUser;
        } catch (error) {
            console.error('Error updating user plan:', error);
            return null;
        }  
    }

    async update_plan(uuid: string, plan: string): Promise<User|null> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return null;
            await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ plan: plan}, { where: { uuid }, transaction });
            });
            const updatedUser = await this.findByUUID(uuid);
            return updatedUser;
        } catch (error) {
            console.error('Error updating user plan:', error);
            return null;
        }  
    }

    async update_profile(uuid: string, profile: Profile): Promise<User|null> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return null;
            await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ description: profile.description, company:profile.company}, { where: { uuid }, transaction });
            });
            const updatedUser = await this.findByUUID(uuid);
            return updatedUser;
        } catch (error) {
            console.error('Error updating user plan:', error);
            return null;
        }
    }

    async update_ubication(uuid: string, longitude: number, latitude: number): Promise<User|null> {
        try {
            let userExists = await this.findByUUID(uuid);
            if (!userExists) return null;
            await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ latitude: longitude, longitude:latitude}, { where: { uuid }, transaction });
            });
            const updatedUser = await this.findByUUID(uuid);
            return updatedUser;
        } catch (error) {
            console.error('Error updating user plan:', error);
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
