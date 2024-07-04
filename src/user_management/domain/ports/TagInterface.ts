import { Tag } from "../entities/Tag";

export interface TagInterface {
    create(tag: Tag): Promise<Tag|null>;
    update(uuid:string, tag: Tag): Promise<Tag|null>;
    delete(uuid: string): Promise<boolean>;
    list(): Promise<Tag[]|null>;
    findByUUID(uuid: string): Promise<Tag|null>;
}