import { Account } from "../account/account";
import { Category } from "../category/category";
import { PaymentType } from "../payment-type/payment-type";


export interface Transaction {
  transactionID?: number;
  type: string;
  date: Date;
  name: string;
  value: bigint;
  comment?: string;
  createdDT: Date;
  
  // account: Account;
  
  // category: Category;
  
  // paymentType: PaymentType;
}
