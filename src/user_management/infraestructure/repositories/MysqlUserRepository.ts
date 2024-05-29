// MysqlUserRepository.ts

import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import UserEntity from '../daos/UserEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { UserDaoMapper } from '../mappers/UserDaoMapper';

export class MysqlUserRepository implements UserInterface {
    
    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await UserEntity.findOne({ where: { email } });
        return userEntity ? UserDaoMapper.toDomain(userEntity) : null;
    }

    async findByUUID(uuid: string): Promise<User | null> {
        const userEntity = await UserEntity.findByPk(uuid);
        return userEntity ? UserDaoMapper.toDomain(userEntity) : null;
    }

    async delete(uuid: string): Promise<boolean> {
        try {
            await UserEntity.destroy({ where: { uuid } });
            return true;
        } catch (error) {
            return false;
        }
    }

    async update(uuid: string, user: User): Promise<User | null> {
        const userEntity = UserDaoMapper.toEntity(user);
        await UserEntity.update(userEntity, { where: { uuid } });
        return user;
    }

    async list(): Promise<User[] | null> {
        const userEntities = await UserEntity.findAll();
        return userEntities.map(userEntity => UserDaoMapper.toDomain(userEntity));
    }

    async updateUserVerifiedAt(uuid: string): Promise<boolean> {
        try {
            await UserEntity.update({ verifiedAt: new Date() }, { where: { uuid } });
            return true;
        } catch (error) {
            return false;
        }
    }

    async sign_up(user: User): Promise<User | null> {
        try {
            const userEntity = UserDaoMapper.toEntity(user);
            await userEntity.save()
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async sign_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        const userEntity = await UserEntity.findOne({ where: { email } });
        if (!userEntity) return null;
        
        const user = UserDaoMapper.toDomain(userEntity);
        if (await encryptionService.compare(password, user.credentials.password)) {
            user.status.token = await tokenServices.generateToken();
            await UserEntity.update({ token: user.status.token }, { where: { uuid: user.uuid } });
            return user;
        } else {
            return null;
        }
    }

    async sign_out(uuid: string): Promise<boolean> {
        try {
            await UserEntity.update({ token: '' }, { where: { uuid } });
            return true;
        } catch (error) {
            return false;
        }
    }
}
