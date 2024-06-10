export interface IUserSaga {
    sendToken(token: string): Promise<void>;
}