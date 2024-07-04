import { Tag } from "../entities/Tag";
import { UserTag } from "../entities/UserTag";

export interface UserTagInterface {
    create(tag: UserTag): Promise<UserTag|null>;
    deleteByUuidTag(uuid: string): Promise<boolean>;
    deleteByUuidUser(uuid: string): Promise<boolean>;
    findByUuidUser(uuid: string): Promise<UserTag[]|null>;
    findByUuidTag(uuid: string): Promise<UserTag[]|null>;
}