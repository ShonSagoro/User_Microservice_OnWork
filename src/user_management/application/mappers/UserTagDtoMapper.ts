import { Request } from 'express';
import { CreateTagRequest } from '../dtos/request/CreateTagRequest';
import { UpdateTagRequest } from '../dtos/request/UpdateTagRequest';
import { Tag } from '../../domain/entities/Tag';
import { TagResponse } from '../dtos/response/TagResponse';
import { CreateUserTagRequest } from '../dtos/request/CreateUserTagRequest';
import { UserTag } from '../../domain/entities/UserTag';
import { UserTagResponse } from '../dtos/response/UserTagResponse';

export class UserTagDtoMapper {
    static toCreateUserTagRequest(req: Request): CreateUserTagRequest | null {
        const body = req.body;
        if (!body.uuidUser || !body.uuidTag) {
            return null;
        }
        return new CreateUserTagRequest(body.uuidUser, body.uuidTag);
    }

    static toUserTagResponse(userTag: UserTag): UserTagResponse{
        return new UserTagResponse(userTag.uuid, userTag.userid, userTag.tagid);
    }

    static toDomain(createUserTagRequest: CreateUserTagRequest): UserTag {
        return new UserTag(createUserTagRequest.uuidUser, createUserTagRequest.uuidTag);
    }
}