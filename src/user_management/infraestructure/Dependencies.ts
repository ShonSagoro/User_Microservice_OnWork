import { DeleteUserUseCase } from "../application/use_case/DeleteUserUseCase";
import { ActivateUserUseCase } from "../application/use_case/ActivateUserUseCase";
import { GetByUserUseCase } from "../application/use_case/GetByUserUseCase";
import { ListUsersUseCase } from "../application/use_case/ListUsersUseCase";
import { SignInUserUseCase } from "../application/use_case/SignInUserUseCase";
import { SignOutUserUseCase } from "../application/use_case/SignOutUserUseCase";
import { SignUpUserUseCase } from "../application/use_case/SignUpUserUseCase";
import { UpdateUserUseCase } from "../application/use_case/UpdateUserUseCase";
import { ActivateUserController } from "./controllers/ActivateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import GetUserByEmailController from "./controllers/GetUserByEmailController";
import GetUserByUuidController from "./controllers/GetUserByUuidController";
import { ListUsersController } from "./controllers/ListUsersController";
import { SignInUserController } from "./controllers/SignInUserController";
import { SignOutUserController } from "./controllers/SignOutUserController";
import { SingUpUserController } from "./controllers/SignUpUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { MysqlUserRepository } from "./repositories/MysqlUserRepository";
import { ByEncryptServices } from "./services/ByEncryptServices";
import { NodemailerEmailService } from "./services/NodemailerEmailService";
import { TokenServices } from "./services/TokenServices";
import { UserSagaImpl } from "./services/UserSagaImpl";

export const databaseRepository = new MysqlUserRepository();

export const encriptServices = new ByEncryptServices();
export const nodemailerEmailService = new NodemailerEmailService();
export const tokenServices = new TokenServices();
export const userSaga = new UserSagaImpl();

export const singUpUserCase = new SignUpUserUseCase(databaseRepository);
export const getUserUseCase = new GetByUserUseCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserUseCase(databaseRepository);
export const listUsersCase = new ListUsersUseCase(databaseRepository);
export const activateUserCase = new ActivateUserUseCase(databaseRepository);
export const singInUserCase = new SignInUserUseCase(databaseRepository);
export const singOutUserCase = new SignOutUserUseCase(databaseRepository);

export const singInUserController = new SignInUserController(singInUserCase, encriptServices, tokenServices);
export const singUpUserController = new SingUpUserController(singUpUserCase, nodemailerEmailService, encriptServices);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByUuidController = new GetUserByUuidController(getUserUseCase);
export const getByEmailController = new GetUserByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase, encriptServices);
export const listUsersController = new ListUsersController(listUsersCase);
export const activateUserController = new ActivateUserController(activateUserCase);
export const singOutUserController = new SignOutUserController(singOutUserCase, userSaga);