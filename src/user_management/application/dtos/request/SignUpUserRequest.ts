export class SignUpUserRequest {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    birthday: string; //YYYY-MM-DD
    region: string;

    constructor(email: string, password: string, name: string, lastname: string, phoneNumber: string, birthday: string, region: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastname;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.region = region;
    }
}