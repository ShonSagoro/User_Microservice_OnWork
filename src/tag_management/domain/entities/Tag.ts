import { v4 as uuidv4 } from 'uuid';

export class Tag {
    public uuid: string
    public title: string
    public description: string
    constructor( title: string, description: string) {
        this.uuid = uuidv4();
        this.title = title;
        this.description = description;
    }
}