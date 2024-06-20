export class UserResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    birthday: string; //YYYY-MM-DD
    region: string;

    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string, birthday:string, region:string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.region = region;
    }
}