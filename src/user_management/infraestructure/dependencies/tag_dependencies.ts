import { CreateTagUseCases } from "../../application/use_case/CreateTagUseCases";
import { GetByUuidTagUseCase } from "../../application/use_case/GetByUuidTagUseCase";
import { ListTagUseCase } from "../../application/use_case/ListTagUseCase";
import { DeleteTagUseCase } from "../../application/use_case/DeleteTagUseCase";
import GetUserByTagUuidController from "../controllers/GetUserByTagUuidController";
import { UpdateTagController } from "../controllers/UpdateTagController";
import { MysqlTagRepository } from "../repositories/MysqlTagRepository";
import { UpdateTagUseCase } from "../../application/use_case/UpdateTagUseCase";
import { CreateTagController } from "../controllers/CreateTagController";
import { ListTagController } from "../controllers/ListTagController";
import { GetByUuidTagController } from "../controllers/GetByUuidTagController";
import { DeleteTagController } from "../controllers/DeleteTagController";

const tagRepository = new MysqlTagRepository();

export const createTagUseCase = new CreateTagUseCases(tagRepository);
export const listTagUseCase = new ListTagUseCase(tagRepository);
export const getByUuidTagUseCase = new GetByUuidTagUseCase(tagRepository);
export const updateTagUseCase = new UpdateTagUseCase(tagRepository);
export const deleteTagUseCase = new DeleteTagUseCase(tagRepository);

export const createTagController = new CreateTagController(createTagUseCase);
export const listTagController = new ListTagController(listTagUseCase);
export const getByUuidTagController = new GetByUuidTagController(getByUuidTagUseCase);
export const updateTagController = new UpdateTagController(updateTagUseCase);
export const deleteTagController = new DeleteTagController(deleteTagUseCase);

