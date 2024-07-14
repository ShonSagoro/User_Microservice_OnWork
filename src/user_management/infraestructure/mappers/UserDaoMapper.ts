import { User } from './../../domain/entities/User';
import { Contact } from './../../domain/entities/Contact';
import UserEntity from "../daos/UserEntity";
import { Credentials } from '../../domain/entities/Credentials';
import { Status } from '../../domain/entities/Status';
import { Plan } from '../../domain/entities/enums/Plan';
import { Ubication } from '../../domain/entities/Ubication';
import { Profile } from '../../domain/entities/Profile';
import { Tag } from '../../domain/entities/Tag';
import TagEntity from '../daos/TagEntity';
import { TagDaoMapper } from './TagDaoMapper';

export class UserDaoMapper {
    static toDomain(userEntity: UserEntity, tags: TagEntity[]): User {
        const contact = new Contact(
            userEntity.dataValues.name,
            userEntity.dataValues.lastName,
            userEntity.dataValues.phoneNumber,
            userEntity.dataValues.birthday,
            userEntity.dataValues.region
        );
        const plan = userEntity.dataValues.plan;
        const role = userEntity.dataValues.role;
        const ubication = new Ubication(
            userEntity.dataValues.latitude,
            userEntity.dataValues.longitude
        );
        const profile = new Profile(
            userEntity.dataValues.description,
            userEntity.dataValues.company
        );
        const credentials = new Credentials(
            userEntity.dataValues.email,
            userEntity.dataValues.password
        );
        const status = new Status(
            userEntity.dataValues.token,
            userEntity.dataValues.verifiedAt,
            userEntity.dataValues.verified,
            userEntity.dataValues.isLogging
        );

        const tagsEntity: TagEntity[] = tags  || [];
        const tagsDomain: Tag[] = tagsEntity.map(tag => TagDaoMapper.toDomain(tag));
        const user = new User(
            contact,
            credentials,
            status,
            plan,
            role,
            ubication,
            profile,
            tagsDomain
        );
        
        user.uuid = userEntity.dataValues.uuid;
        return user;
    }

    static toUpdateEntity(user: User, uuid: string): UserEntity {
        return UserEntity.build({
            uuid: uuid,
            email: user.credentials.email,
            name: user.contact.name,
            lastName: user.contact.lastName,
            phoneNumber: user.contact.phoneNumber,
            birthday: user.contact.birthday,
            region: user.contact.region,            
        })
    }
    
    static toEntity(user: User): UserEntity {
        return UserEntity.build(
            {
                uuid: user.uuid,
                token: user.status.token,
                verifiedAt: user.status.verifiedAt,
                email: user.credentials.email,
                password: user.credentials.password,
                name: user.contact.name,
                lastName: user.contact.lastName,
                phoneNumber: user.contact.phoneNumber,
                birthday: user.contact.birthday,
                region: user.contact.region,
                plan: user.plan,
                role: user.role,
                latitude: user.ubication.latitude,
                longitude: user.ubication.longitude,
                description: user.profile.description,
                company: user.profile.company,
                isLogging: user.status.isLoggin,
                verified: user.status.verified
            }
        );
    }
}

