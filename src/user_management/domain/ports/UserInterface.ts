import { EncryptService } from "../services/EncriptServices";
import { User } from "../entities/User";
import { TokenServices } from "../services/TokenServices";
import { Profile } from "../entities/Profile";

export interface UserInterface {
    findByEmail(email: string): Promise<User | null>;
    findByUUID(uuid: string): Promise<User | null>;
    delete(uuid: string): Promise<boolean>;
    update(uuid:string, user: User): Promise<User | null>;
    list(): Promise<User[]|null>;
    update_user_verified_at(uuid: string, token:string):Promise<boolean>;
    sign_up(user: User): Promise<User | null>;
    sign_in (email:string, password:string):Promise<User|null>;
    sing_in_provider (email:string, password:string):Promise<User|null>;
    sign_out (uuid:string):Promise<boolean>; 
    update_password(uuid:string, old_password:string, new_password:string):Promise<User|null>; //direct
    update_role(uuid:string, role:string):Promise<User|null>; //direct
    update_plan(uuid:string, plan:string):Promise<User|null>; //Plan with logic of payment
    update_profile(uuid:string, profile: Profile):Promise<User|null>; //direct
    update_ubication(uuid:string, longitude:number, latitude:number):Promise<User|null>; //direct
}
