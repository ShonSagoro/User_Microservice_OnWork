export class UserProviderResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    birthday: string; //YYYY-MM-DD
    region: string;
    description: string;
    company: string;
    latitude: number;
    longitude: number;


    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string, birthday:string, region:string, description: string, company: string,latitude: number, longitude: number) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.region = region;
        this.description = description;
        this.company = company;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}