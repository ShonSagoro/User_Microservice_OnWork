export class UpdatePasswordUserRequest{
    password: string;
    newPassword: string;

    constructor(password: string, newPassword: string){
        this.password = password;
        this.newPassword = newPassword;
    }
}