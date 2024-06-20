import { Express } from "express";
import dotenv from 'dotenv';
import { activateUserController, deleteUserController, getByUuidController, listUsersController, signInProviderUserController, signInUserController, signOutUserController, signUpUserController, updatePasswordUserController, updatePlanUserController, updateProfileUserController, updateRoleUserController, updateUbicationController, updateUserController } from "../Dependencies";
dotenv.config();


export function setupUserEndpoints(app: Express) {
    app.get(`/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/:uuid`, getByUuidController.execute.bind(getByUuidController));
    app.get(`/`, listUsersController.execute.bind(listUsersController));
    app.get(`/sign_out/:uuid`, signOutUserController.execute.bind(signOutUserController));
    app.post(`/sign_up`, signUpUserController.execute.bind(signUpUserController));
    app.post(`/sign_in`, signInUserController.execute.bind(signInUserController));
    app.post(`/sign_in_provider`, signInProviderUserController.execute.bind(signInProviderUserController));
    app.post(`/activate/:uuid`, activateUserController.execute.bind(activateUserController));
    app.delete(`/:uuid`, deleteUserController.execute.bind(deleteUserController));
    app.put(`/password/:uuid`, updatePasswordUserController.execute.bind(updatePasswordUserController));
    app.put(`/plan/:uuid`, updatePlanUserController.execute.bind(updatePlanUserController));
    app.put(`/profile/:uuid`, updateProfileUserController.execute.bind(updateProfileUserController));
    app.put(`/role/:uuid`, updateRoleUserController.execute.bind(updateRoleUserController));
    app.put(`/ubication/:uuid`, updateUbicationController.execute.bind(updateUbicationController));
    app.put(`/:uuid`, updateUserController.execute.bind(updateUserController));
}