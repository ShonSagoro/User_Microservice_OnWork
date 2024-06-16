import { Request } from "express";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { Role } from "../../domain/entities/enums/Role";

export class UpdateUbicationUseCase {
    constructor(private userInterface: UserInterface) { }
    async updatePlan(uuid: string, req: Request): Promise<BaseResponse> {
        //TODO: si ya pago, esto queda como SERVICE_PROVIDER de cajon, si no, ya que haga el cambio
        let role = UserDtoMapper.toUpdateRoleUserRequest(req);
        if (!role) {
            return new BaseResponse(null, 'Bad request or the role not exist', false, 400);
        }
        let result = await this.userInterface.update_role(uuid, Role[role.role]);
        if (result) {
            let response = UserDtoMapper.toUpdateRoleUserResponse(result);
            return new BaseResponse(response, 'Role updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Role not updated', false, 400);
    }
}