import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { createUserTagController, deleteUserTagController } from "../dependencies/user_tag_dependencies";

let model = 'user_tags';
const Verifytoken = JWTMiddleware.VerifyToken


export function setupUserTagEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`/${model}/`, Verifytoken, createUserTagController.execute.bind(createUserTagController));
    app.delete(`/${model}/:uuid`, Verifytoken, deleteUserTagController.execute.bind(deleteUserTagController));
}