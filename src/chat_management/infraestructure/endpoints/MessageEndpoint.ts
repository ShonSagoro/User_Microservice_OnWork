import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { createMessageController, deleteMessageController, listMessageByChatController } from "../dependencies/MessageDependencies";

let messageModel = 'messages';
const VerifyToken = JWTMiddleware.VerifyToken;

export function setupMessageEndpoints(app: Express) {
    app.get(`/${messageModel}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${messageModel}/chat/:uuid`, VerifyToken, listMessageByChatController.execute.bind(listMessageByChatController));
    app.post(`/${messageModel}/`, VerifyToken, createMessageController.execute.bind(createMessageController));
    app.delete(`/${messageModel}/:uuid`, VerifyToken, deleteMessageController.execute.bind(deleteMessageController));
}
