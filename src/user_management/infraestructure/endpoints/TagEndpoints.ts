import { Express } from "express";
import { createTagController, deleteTagController, getByUuidTagController, listTagController, updateTagController } from "../Dependencies";
import JWTMiddleware from "../../../middleware/JWTMiddleware";

let model = 'tags';
const Verifytoken = JWTMiddleware.VerifyToken


export function setupTagEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${model}/:uuid`, Verifytoken, getByUuidTagController.execute.bind(getByUuidTagController));
    app.get(`/${model}/`, Verifytoken, listTagController.execute.bind(listTagController));
    app.post(`/${model}/`, Verifytoken, createTagController.execute.bind(createTagController));
    app.put(`/${model}/:uuid`, Verifytoken, updateTagController.execute.bind(updateTagController));
    app.delete(`/${model}/:uuid`, Verifytoken, deleteTagController.execute.bind(deleteTagController));
}