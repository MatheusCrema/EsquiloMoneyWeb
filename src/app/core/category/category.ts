import { CategoryComponent } from "./category.component"

export interface Category {
    categoryID: number;
    name: string;
    description: string;
    iconUI: string;
    hierarchy: number;
    createdDT: Date;
    
}

export interface CategoryResult {
    totalItems: number;
    items: Category[];
}