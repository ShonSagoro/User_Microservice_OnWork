import { CreateChatUseCases } from "../../application/use_cases/CreateChatUseCases";
import { DeleteChatUseCase } from "../../application/use_cases/DeleteChatUseCase";
import { GetChatByUuidUseCase } from "../../application/use_cases/GetChatByUuidUseCase";
import { ListChatByUserUseCase } from "../../application/use_cases/ListChatByUserUseCase";
import { CreateChatController } from "../controllers/CreateChatController";
import { DeleteChatController } from "../controllers/DeleteChatController";
import { GetChatByUuidController } from "../controllers/GetChatByUuidController";
import { ListChatByUserController } from "../controllers/ListChatByUserController";
import { MysqlChatRepository } from "../repositories/MysqlChatRepository";

const repository = new MysqlChatRepository();

export const createChatUseCases = new CreateChatUseCases(repository);
export const deleteChatUseCase = new DeleteChatUseCase(repository);
export const getChatByUuidUseCase = new GetChatByUuidUseCase(repository);
export const listChatByUserUseCase = new ListChatByUserUseCase(repository);

export const createChatController = new CreateChatController(createChatUseCases);
export const deleteChatController = new DeleteChatController(deleteChatUseCase);
export const getChatByUuidController = new GetChatByUuidController(getChatByUuidUseCase);
export const listChatByUserController = new ListChatByUserController(listChatByUserUseCase);
