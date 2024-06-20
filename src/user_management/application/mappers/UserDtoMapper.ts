import { Plan } from './../../domain/entities/enums/Plan';
import { Credentials } from './../../domain/entities/Credentials';
import { Request } from 'express';
import { SignUpUserRequest } from '../dtos/request/SignUpUserRequest';
import { User } from '../../domain/entities/User';
import { UserResponse } from '../dtos/response/UserResponse';
import { Contact } from '../../domain/entities/Contact';
import { Status } from '../../domain/entities/Status';
import { UpdateUserRequest } from '../dtos/request/UpdateUserRequest';
import { SignInUserRequest } from '../dtos/request/SignInUserRequest';
import { Role } from '../../domain/entities/enums/Role';
import { Ubication } from '../../domain/entities/Ubication';
import { Profile } from '../../domain/entities/Profile';
import { UpdatePasswordUserRequest } from '../dtos/request/UpdatePasswordUserRequest';
import { UpdateProfileUserRequest } from '../dtos/request/UpdateProfileUserRequest';
import { UpdateUbicationUserRequest } from '../dtos/request/UpdateUbicationUserRequest';
import { PasswordUpdateResponse } from '../dtos/response/PasswordUpdateResponse';
import { ProfileUserUpdateRespose } from '../dtos/response/ProfileUserUpdateRespose';
import { TokenUserReponse } from '../dtos/response/TokenUserReponse';
import { UbicationUserResponse } from '../dtos/response/UbicationUserResponse';
import { UpdatePlanUserRequest } from '../dtos/request/UpdatePlanUserRequest';
import { PlanUserUpdateResponse } from '../dtos/response/PlanUserUpdateResponse';
import { UpdateRoleUserRequest } from '../dtos/request/UpdateRoleUserRequest';
import { RoleUserUpdateResponse } from '../dtos/response/RoleUserUpdateResponse';
import { SingUpUserResponse } from '../dtos/response/SingUpUserResponse';
import { VerifiedUserRequest } from '../dtos/request/VerifiedUserRequest';

export class UserDtoMapper {
    
    static toSignUpUserRequest(req: Request): SignUpUserRequest | null {
        const body = req.body;
        if (!body.name || !body.lastName || !body.phoneNumber || !body.email|| !body.password || !body.birthday || !body.region) {
            return null;
        }
        return new SignUpUserRequest(body.email, body.password, body.name, body.lastName, body.phoneNumber, body.birthday, body.region);
    }

    static toActivateUserRequest(req: Request): VerifiedUserRequest | null {
        const body = req.body;
        return new VerifiedUserRequest(body.token);
    }
    static toUpdatePlanUserRequest(req: Request): UpdatePlanUserRequest | null {
        const body = req.body;
        if (!body.plan) {
            return null;
        }
        return new UpdatePlanUserRequest(body.plan);
    }

    static toUpdateRoleUserRequest(req: Request): UpdateRoleUserRequest | null {
        const body = req.body;
        if (!body.role) {
            return null;
        }
        return new UpdateRoleUserRequest(body.role);
    }

    static toSignIpUserRequest(req: Request): SignInUserRequest | null{
        const body = req.body;
        if (!body.email || !body.password) {
            return null;
        }
        return new SignInUserRequest(body.email, body.password);
    }

    static toUpdateUserRequest(req: Request): UpdateUserRequest {
        const body = req.body;
        return new UpdateUserRequest(body.email, body.name, body.lastName, body.phoneNumber, body.birthday, body.region);
    }

    static toUpdatePasswordUserRequest(req: Request): UpdatePasswordUserRequest {
        const body = req.body;
        return new UpdatePasswordUserRequest(body.password, body.newPassword);
    }

    static toUpdateProfileUserRequest(req: Request): UpdateProfileUserRequest {
        const body = req.body;
        return new UpdateProfileUserRequest(body.description, body.company);
    }

    static toUpdateUbicationUserRequest(req: Request): UpdateUbicationUserRequest {
        const body = req.body;
        return new UpdateUbicationUserRequest(parseInt(body.latitude), parseInt(body.longitude));
    }

    static toUserResponse(user: User): UserResponse {
        return new UserResponse(user.uuid, user.contact.name, user.credentials.email, user.contact.lastName, user.contact.phoneNumber, user.contact.birthday.toISOString().split('T')[0], user.contact.region);
    }

    static toPasswordUserResponse(user: User): PasswordUpdateResponse {
        return new PasswordUpdateResponse(user.uuid, "Password updated successfully");
    }

    static toProfileUserUpdateRespose(user: User): ProfileUserUpdateRespose {
        return new ProfileUserUpdateRespose(user.uuid, user.profile.description, user.profile.company);
    }

    static toTokenUserReponse(user: User): TokenUserReponse {
        return new TokenUserReponse(user.uuid);
    }

    static toUbicationUserResponse(user: User): UbicationUserResponse {
        return new UbicationUserResponse(user.uuid, user.ubication.latitude, user.ubication.longitude);
    }
    
    static toUpdatePlanUserResponse(user: User): PlanUserUpdateResponse {
        return new PlanUserUpdateResponse(user.uuid, user.plan);
    }

    static toUpdateRoleUserResponse(user: User): RoleUserUpdateResponse {
        return new RoleUserUpdateResponse(user.uuid, user.role);
    }

    static toSingUpUserResponse(user: User):SingUpUserResponse  {
        return new SingUpUserResponse(user.uuid, user.contact.name, user.credentials.email, user.contact.lastName, user.contact.phoneNumber, user.contact.birthday.toISOString().split('T')[0], user.contact.region ,user.status.token);
    }

    static toDomainUserSignUp(signUpUserRequest: SignUpUserRequest): User {
        let contact = new Contact(signUpUserRequest.name, signUpUserRequest.lastName, signUpUserRequest.phoneNumber, new Date(signUpUserRequest.birthday), signUpUserRequest.region);
        let credentials = new Credentials(signUpUserRequest.email, signUpUserRequest.password);
        let status = new Status("", new Date(), false);
        let plan = Plan.FREE;
        let role = Role.CLIENT;
        let ubication = new Ubication(0,0);
        let profile = new Profile("we don't know anything yet about this person, but we think he's great.", "");
        return new User(contact, credentials, status, plan, role, ubication, profile);
    }

    static toDomainUserUpdate(updateUserRequest: UpdateUserRequest): User {
        let contact = new Contact(updateUserRequest.name, updateUserRequest.lastName, updateUserRequest.phoneNumber, new Date(updateUserRequest.birthday), updateUserRequest.region);
        let credentials = new Credentials(updateUserRequest.email, "");
        let status = new Status("", new Date, false);
        let plan = Plan.FREE;
        let role = Role.CLIENT;
        let ubication = new Ubication(0,0);
        let profile = new Profile("we don't know anything yet about this person, but we think he's great.", "");
         return new User(contact, credentials, status, plan, role, ubication, profile);
    }
}