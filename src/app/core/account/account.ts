import { ProfileComponent } from "../profile/profile.component"


export interface Account {
    accountID: number;
    number: string;
    expireDT: Date;
    createdDT: Date;
    //identityID: number;   
    //institutionID: number;   
}


export interface AccountResult {
    totalItems: number;
    items: Account[];
}
