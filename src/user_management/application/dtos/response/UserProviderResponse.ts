import { TagResponse } from "./TagResponse";

export class UserProviderResponse {
    uuid: string;
    email: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    birthday: string; //YYYY-MM-DD
    region: string;
    plan: string;
    role: string;
    latitude: number;
    longitude: number;
    description: string;
    company: string;
    tags: TagResponse[];


    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string, birthday:string, region:string, plan: string, role: string, latitude: number, longitude: number, description: string, company: string, tags: TagResponse[]) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.region = region;
        this.plan = plan;
        this.role = role;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.company = company;
        this.tags = tags;
    }
}