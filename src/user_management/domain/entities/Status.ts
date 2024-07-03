export class Status {
    constructor(
        public token: string,
        public verifiedAt: Date,
        public verified: boolean,
        public isLoggin: boolean,
    ) {}
}