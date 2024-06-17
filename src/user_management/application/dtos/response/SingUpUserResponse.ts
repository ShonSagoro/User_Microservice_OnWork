export class SingUpUserResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    token: string;

    constructor(uuid: string, name: string, email: string, lastName: string, phoneNumber: string, token: string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.token = token;
    }
}