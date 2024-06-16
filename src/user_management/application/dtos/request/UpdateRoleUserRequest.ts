import { Role } from "../../../domain/entities/enums/Role";

export class UpdateRoleUserRequest{
    role: Role;

    constructor(plan: string) {
        this.role = Role[plan as keyof typeof Role];
    }
}