import { CreateUserTagUseCases } from "../../application/use_case/CreateUserTagUseCase";
import { DeleteTagUserUseCase } from "../../application/use_case/DeleteTagUserUseCase";
import { CreateUserTagController } from "../controllers/CreateUserTagController";
import { DeleteUserTagController } from "../controllers/DeleteUserTagController";
import { MysqlUserTagRepository } from "../repositories/MysqlUserTagRepository";

const userTagRepository = new MysqlUserTagRepository();

export const createUserTagUseCases = new CreateUserTagUseCases(userTagRepository);
export const deleteTagUserUseCase = new DeleteTagUserUseCase(userTagRepository);

export const createUserTagController = new CreateUserTagController(createUserTagUseCases);
export const deleteUserTagController = new DeleteUserTagController(deleteTagUserUseCase);
