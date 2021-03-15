import { DecimalPipe } from "@angular/common";
import { CategoryComponent } from "./category.component"


export interface CategoryBalance {
    categoryBalanceID: number;
    period: string;
    referenceDate: Date;
    totalExpense: bigint;
    plannedExpense: bigint;
    createdDT: Date;
    categoryID: number;   
}


export interface Category {
    categoryID?: number;
    name: string;
    description: string;
    hierarchy: number;
    iconUI?: string;
    createdDT?: Date;

    categoryParentID?: number;    
    categoryBalances?: CategoryBalance[];
}

export interface CategoryResult {
    totalItems: number;
    items: Category[];
}

export interface dataJarbas {
    name: string;
    description: string;
    hierarchy: number;
  }