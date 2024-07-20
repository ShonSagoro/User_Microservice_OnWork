import { CreateMessageUseCases } from "../../application/use_cases/CreateMessageUseCases";
import { DeleteMessageUseCase } from "../../application/use_cases/DeleteMessageUseCase";
import { ListMessageByChatUseCase } from "../../application/use_cases/ListMessageByChatUseCase";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { DeleteMessageController } from "../controllers/DeleteMessageController";
import { ListMessageByChatController } from "../controllers/ListMessageByChatController";
import { MysqlMessageRepository } from "../repositories/MysqlMessageRepository ";

const repository = new MysqlMessageRepository();

export const createMessageUseCases = new CreateMessageUseCases(repository);
export const deleteMessageUseCase = new DeleteMessageUseCase(repository);
export const listMessageByChatUseCase = new ListMessageByChatUseCase(repository);

export const createMessageController = new CreateMessageController(createMessageUseCases);
export const deleteMessageController = new DeleteMessageController(deleteMessageUseCase);
export const listMessageByChatController = new ListMessageByChatController(listMessageByChatUseCase);
