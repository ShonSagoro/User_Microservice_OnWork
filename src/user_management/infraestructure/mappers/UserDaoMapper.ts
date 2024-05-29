import { User } from './../../domain/entities/User';
import { Contact } from './../../domain/entities/Contact';
import UserEntity from "../daos/UserEntity";
import { Credentials } from '../../domain/entities/Credentials';
import { Status } from '../../domain/entities/Status';

export class UserDaoMapper {
    static toDomain(userEntity: UserEntity): User{
        let contact = new Contact(userEntity.name, userEntity.lastName, userEntity.phoneNumber);
        let credentials = new Credentials(userEntity.email, userEntity.password);
        let status = new Status(userEntity.token,userEntity.verifiedAt);
        let user = new User(contact, credentials, status);
        user.uuid = userEntity.uuid;
        return user;
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
                phoneNumber: user.contact.phoneNumber
            }
        );
    }
}

