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
    categoryID: number;
    name: string;
    description: string;
    iconUI: string;
    hierarchy: number;
    createdDT: Date;
    
    categoryBalances: CategoryBalance[];
}

export interface CategoryResult {
    totalItems: number;
    items: Category[];
}