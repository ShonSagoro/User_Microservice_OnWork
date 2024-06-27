import { TokenServices } from '../../domain/services/TokenServices';

export class TokenAuthServices implements TokenServices {
    constructor() {
    }

    async generateToken(): Promise<string> {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const token = array[0] % 1000000;
        return token.toString().padStart(6, '0');
    }
}