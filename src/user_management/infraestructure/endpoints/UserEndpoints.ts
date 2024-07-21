import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import { activateUserController, deleteUserController, getByTagUuidController, getByUbicationController, getByUuidController, getTokenValidateByUuidUserController, listUsersController, listUsersProvidersController, refreshTokenUserController, signInProviderUserController, signInUserController, signOutUserController, signUpUserController, signUpUserProviderController, updatePasswordUserController, updatePlanUserController, updateProfileUserController, updateRoleUserController, updateUbicationController, updateUserController, validateUserController } from "../dependencies/user_dependencies";
let model = "users";
const Verifytoken = JWTMiddleware.VerifyToken
const Validate = JWTMiddleware.ValidateToken

export function setupUserEndpoints(app: Express) {
    app.get(`/${model}/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.get(`/${model}/`, Verifytoken, listUsersController.execute.bind(listUsersController));
    app.get(`/${model}/token/:email`, getTokenValidateByUuidUserController.execute.bind(getTokenValidateByUuidUserController));
    app.get(`/${model}/sign_out/:uuid`, Verifytoken, signOutUserController.execute.bind(signOutUserController));
    app.get(`/${model}/providers`, Verifytoken, listUsersProvidersController.execute.bind(listUsersProvidersController));
    app.get(`/${model}/validate`, Validate, validateUserController.execute.bind(validateUserController));
    app.get(`/${model}/refresh/:uuid`, Verifytoken, refreshTokenUserController.execute.bind(refreshTokenUserController));
    app.get(`/${model}/tag/:uuid`, Verifytoken, getByTagUuidController.execute.bind(getByTagUuidController));
    app.get(`/${model}/:uuid`, Verifytoken, getByUuidController.execute.bind(getByUuidController));
    app.post(`/${model}/ubication`,Verifytoken,  getByUbicationController.execute.bind(getByUbicationController));
    app.post(`/${model}/ubication/:uuid`,Verifytoken,  getByUbicationController.execute.bind(getByUbicationController));
    app.post(`/${model}/sign_up`, signUpUserController.execute.bind(signUpUserController));
    app.post(`/${model}/sign_in`, signInUserController.execute.bind(signInUserController));
    app.post(`/${model}/sign_up_provider`, signUpUserProviderController.execute.bind(signUpUserProviderController));
    app.post(`/${model}/sign_in_provider`, signInProviderUserController.execute.bind(signInProviderUserController));
    app.post(`/${model}/activate/:uuid`, activateUserController.execute.bind(activateUserController));
    app.delete(`/${model}/:uuid`, Verifytoken, deleteUserController.execute.bind(deleteUserController));
    app.put(`/${model}/password/:uuid`, Verifytoken, updatePasswordUserController.execute.bind(updatePasswordUserController));
    app.put(`/${model}/plan/:uuid`, Verifytoken, updatePlanUserController.execute.bind(updatePlanUserController));
    app.put(`/${model}/profile/:uuid`, Verifytoken, updateProfileUserController.execute.bind(updateProfileUserController));
    app.put(`/${model}/role/:uuid`, Verifytoken, updateRoleUserController.execute.bind(updateRoleUserController));
    app.put(`/${model}/ubication/:uuid`, Verifytoken, updateUbicationController.execute.bind(updateUbicationController));
    app.put(`/${model}/:uuid`, Verifytoken, updateUserController.execute.bind(updateUserController));
}