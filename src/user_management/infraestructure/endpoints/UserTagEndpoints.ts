import { Express } from "express";
import { createTagController, deleteTagController, getByUuidTagController, listTagController, updateTagController } from "../Dependencies";

let model = 'user_tag';

export function setupTagEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    // app.post(`/${model}/`, createTagController.execute.bind(createTagController));
}