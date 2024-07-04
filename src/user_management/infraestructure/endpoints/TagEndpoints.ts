import { Express } from "express";
import { createTagController, deleteTagController, getByUuidTagController, listTagController, updateTagController } from "../Dependencies";

let model = 'tag';

export function setupTagEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${model}/:uuid`, getByUuidTagController.execute.bind(getByUuidTagController));
    app.get(`/${model}/`, listTagController.execute.bind(listTagController));
    app.post(`/${model}/`, createTagController.execute.bind(createTagController));
    app.put(`/${model}/:uuid`, updateTagController.execute.bind(updateTagController));
    app.delete(`/${model}/:uuid`, deleteTagController.execute.bind(deleteTagController));
}