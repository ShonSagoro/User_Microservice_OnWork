import { User } from './User';
import { v4 as uuidv4 } from 'uuid';

export class Tag {
    public uuid: string
    public title: string
    public description: string
    public users: User[]

    constructor( title: string, description: string, users = []) {
        this.uuid = uuidv4();
        this.title = title;
        this.description = description;
        this.users = users;
    }
}