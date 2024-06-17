import { TokenServices } from '../../domain/services/TokenServices';


export class TokenAuthServices implements TokenServices{
    constructor() {
    }

    async generateToken(): Promise<string> {
        return (Math.floor(100000 + Math.random() * 900000)).toString();
    }
}