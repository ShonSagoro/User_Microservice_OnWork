import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';

export class UserTag implements ValidatableEntity {

    public uuid: string;
    
    public user_uuid:string;

    public tag_uuid:string;

    constructor(user_uuid: string, tag_uuid:string){
        this.uuid = uuidv4();
        this.user_uuid=user_uuid
        this.tag_uuid=tag_uuid
    }

    async validate() {
        return Promise.resolve();
    }
}