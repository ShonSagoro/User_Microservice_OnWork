import { Ubication } from './Ubication';
import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';
import { Status } from './Status';
import { Contact } from './Contact';
import { Credentials } from './Credentials';
import { Plan } from './enums/Plan';
import { Role } from './enums/Role';
import { Profile } from './Profile';



export class User implements ValidatableEntity {

    public uuid: string;
    
    public contact: Contact;
    
    public credentials: Credentials;
    
    public status: Status;

    public plan: Plan;

    public role: Role;

    public ubication: Ubication;
    
    public profile: Profile;


    constructor(contact: Contact, credentials: Credentials, status: Status, plan: Plan, role: Role, ubication: Ubication, profile: Profile) {
        this.uuid = uuidv4();
        this.contact=contact
        this.credentials=credentials
        this.status=status
        this.plan=plan
        this.role=role
        this.ubication=ubication
        this.profile=profile
    }

    async validate() {
        return Promise.resolve();
    }
}