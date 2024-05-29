import { Credentials } from './../../domain/entities/Credentials';
import { Request } from 'express';
import { SignUpUserRequest } from '../dtos/request/SignUpUserRequest';
import { User } from '../../domain/entities/User';
import { UserResponse } from '../dtos/response/UserResponse';
import { Contact } from '../../domain/entities/Contact';
import { Status } from '../../domain/entities/Status';

export class UserDtoMapper {
    static toSignUpUserRequest(req: Request): SignUpUserRequest | null {
        const body = req.body;

        if (!body.email || !body.password || !body.name || !body.lastName || !body.phoneNumber) {
            return null;
        }

        return new SignUpUserRequest(body.email, body.password, body.name, body.lastName, body.phoneNumber);
    }

    static toUpdateUserRequest(req: Request): SignUpUserRequest {
        const body = req.body;

        return new SignUpUserRequest(body.email, body.password, body.name, body.lastName, body.phoneNumber);
    }

    static toUserResponse(user: User): UserResponse {
        return new UserResponse(user.uuid, user.contact.name, user.credentials.email, user.contact.lastName, user.contact.phoneNumber);
    }

    static toDomainUserSignUp(signUpUserRequest: SignUpUserRequest): User {
        let contact = new Contact(signUpUserRequest.name, signUpUserRequest.lastName, signUpUserRequest.phoneNumber);
        let credentials = new Credentials(signUpUserRequest.email, signUpUserRequest.password);
        let status = new Status("", new Date());
        return new User(contact, credentials, status);
    }

    static toDomainUserUpdate(signUpUserRequest: SignUpUserRequest, user: User): User {
        let contact = new Contact(signUpUserRequest.name, signUpUserRequest.lastName, signUpUserRequest.phoneNumber);
        let credentials = new Credentials(signUpUserRequest.email, signUpUserRequest.password);
        let status = new Status("", new Date());
        return new User(contact, credentials, status);
    }


}