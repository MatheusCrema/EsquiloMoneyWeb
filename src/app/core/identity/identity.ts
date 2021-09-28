import { Account } from "../account/account";

export interface Identity {
    identityID?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdDT: Date;
    
    accounts?: Account[];
}

export interface IdentityResult {
    totalItems: number;
    items: Identity[];
}
