export class SingUpUserResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    birthday: string; //YYYY-MM-DD
    region: string;
    token: string;

    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string, birthday:string, region:string ,token: string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.region = region;
        this.token = token;
    }
}