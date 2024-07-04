import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';

export class UserTag implements ValidatableEntity {

    public uuid: string;
    
    public userid:string;

    public tagid:string;

    constructor(userid: string, tagid:string){
        this.uuid = uuidv4();
        this.userid=userid
        this.tagid=tagid
    }

    async validate() {
        return Promise.resolve();
    }
}