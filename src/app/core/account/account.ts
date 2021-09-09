import { AccountComponent } from "./account.component"


export interface Account {
    accountID: number;
    number: string;
    expireDT: Date;
    createdDT: Date;
    identityID: number;   
    institutionID: number;   
}


export interface AccountResult {
    totalItems: number;
    items: Account[];
}
