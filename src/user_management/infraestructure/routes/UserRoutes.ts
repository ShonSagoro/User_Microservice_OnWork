import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { activateUserController, deleteUserController, getByUuidController, listUsersController, singInUserController, singOutUserCase, singOutUserController, singUpUserController, updateUserController } from "../Dependencies";
import dotenv from 'dotenv';
dotenv.config();

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "users/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupUserRoutes(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}sing_up`, singUpUserController.execute.bind(singUpUserController));
    app.post(`${BASE_URL}${MODEL_URL}sing_in`, singInUserController.execute.bind(singInUserController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, getByUuidController.execute.bind(getByUuidController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, updateUserController.execute.bind(updateUserController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, deleteUserController.execute.bind(deleteUserController));
    app.get(`${BASE_URL}${MODEL_URL}activate/:uuid`, activateUserController.execute.bind(activateUserController));
    app.get(`${BASE_URL}${MODEL_URL}`, Verifytoken, listUsersController.execute.bind(listUsersController));
    app.get(`${BASE_URL}${MODEL_URL}sing_out/:uuid`, Verifytoken, singOutUserController.execute.bind(singOutUserController));
}