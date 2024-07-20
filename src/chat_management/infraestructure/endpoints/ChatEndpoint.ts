import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { createChatController, deleteChatController, getChatByUuidController, listChatByUserController } from "../dependencies/ChatDependencies";

let chatModel = 'chats';
const VerifyToken = JWTMiddleware.VerifyToken;

export function setupChatEndpoints(app: Express) {
    app.get(`/${chatModel}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${chatModel}/:uuid`, VerifyToken, getChatByUuidController.execute.bind(getChatByUuidController));
    app.get(`/${chatModel}/user/:uuid`, VerifyToken, listChatByUserController.execute.bind(listChatByUserController));
    app.post(`/${chatModel}/`, VerifyToken, createChatController.execute.bind(createChatController));
    app.delete(`/${chatModel}/:uuid`, VerifyToken, deleteChatController.execute.bind(deleteChatController));
}
