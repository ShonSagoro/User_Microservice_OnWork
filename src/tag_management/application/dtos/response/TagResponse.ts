export class TagResponse {
    uuid: string;
    title: string;
    description: string;
    constructor(uuid: string, title: string, description: string) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
    }
}