import { Express } from "express";
import { activateUserController, deleteUserController, getByTagUuidController, getByUbicationController, getByUuidController, listUsersController, listUsersProvidersController, refreshTokenUserController, signInProviderUserController, signInUserController, signOutUserController, signUpUserController, signUpUserProviderController, updatePasswordUserController, updatePlanUserController, updateProfileUserController, updateRoleUserController, updateUbicationController, updateUserController } from "../Dependencies";
let model = "users";

export function setupUserEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${model}/:uuid`, getByUuidController.execute.bind(getByUuidController));
    app.get(`/${model}/`, listUsersController.execute.bind(listUsersController));
    app.get(`/${model}/sign_out/:uuid`, signOutUserController.execute.bind(signOutUserController));
    app.get(`/${model}/providers`, listUsersProvidersController.execute.bind(listUsersProvidersController));
    app.get(`/${model}/refresh/:uuid`, refreshTokenUserController.execute.bind(refreshTokenUserController));
    app.get(`/${model}/tag/users/:uuid`, getByTagUuidController.execute.bind(getByTagUuidController));
    app.post(`/${model}/ubication/:uuid`, getByUbicationController.execute.bind(getByUbicationController));
    app.post(`/${model}/sign_up`, signUpUserController.execute.bind(signUpUserController));
    app.post(`/${model}/sign_in`, signInUserController.execute.bind(signInUserController));
    app.post(`/${model}/sign_in_provider`, signInProviderUserController.execute.bind(signInProviderUserController));
    app.post(`/${model}/activate/:uuid`, activateUserController.execute.bind(activateUserController));
    app.delete(`/${model}/:uuid`, deleteUserController.execute.bind(deleteUserController));
    app.put(`/${model}/password/:uuid`, updatePasswordUserController.execute.bind(updatePasswordUserController));
    app.put(`/${model}/plan/:uuid`, updatePlanUserController.execute.bind(updatePlanUserController));
    app.put(`/${model}/profile/:uuid`, updateProfileUserController.execute.bind(updateProfileUserController));
    app.put(`/${model}/role/:uuid`, updateRoleUserController.execute.bind(updateRoleUserController));
    app.put(`/${model}/ubication/:uuid`, updateUbicationController.execute.bind(updateUbicationController));
    app.put(`/${model}/:uuid`, updateUserController.execute.bind(updateUserController));
    app.post(`/${model}/sign_up_provider`, signUpUserProviderController.execute.bind(signUpUserProviderController));
}