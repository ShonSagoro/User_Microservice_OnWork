import { Request } from 'express';
import { CreateTagRequest } from '../dtos/request/CreateTagRequest';
import { UpdateTagRequest } from '../dtos/request/UpdateTagRequest';
import { Tag } from '../../domain/entities/Tag';
import { TagResponse } from '../dtos/response/TagResponse';

export class TagDtoMapper {
    static toCreateTagRequest(req: Request): CreateTagRequest | null {
        const body = req.body;
        if (!body.title || !body.description) {
            return null;
        }
        return new CreateTagRequest(body.title, body.description);
    }

    static toUpdateTagRequest(req: Request): UpdateTagRequest | null {
        const body = req.body;
        if (!body.title || !body.description) {
            return null;
        }
        return new UpdateTagRequest(body.title, body.description);
    }

    static toTagResponse(tag:Tag): TagResponse{
        return new TagResponse(tag.uuid, tag.title, tag.description);
    }

    static toDomain(createTagRequest: CreateTagRequest): Tag {
        return new Tag(createTagRequest.title, createTagRequest.description);
    }
}