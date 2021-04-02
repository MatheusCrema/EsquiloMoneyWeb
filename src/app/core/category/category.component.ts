import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Category, CategoryResult } from './category';
import { CategoryService } from 'src/app/core/category/category.service';
//import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../dialogs/category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  categoryID: number;

  name: string;
  description: string;
  hierarchy: number;

  newCategory: Category;

  createdCategory: Category;

  categories: Category[];

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCategories();
  }

  addCategory(): void {

    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: '450px',
      width: '480px',
      data: { name: this.name, description: this.description, hierarchy: this.hierarchy }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.newCategory = {
        name: result.name,
        description: result.description,
        hierarchy: result.hierarchy,

        categoryParentID: 0,
        createdDT: new Date()
      };

      var ret = this.categoryService.addCategory(this.newCategory).subscribe(result =>
        this.createdCategory = result
      )

    });
  }

  deleteCategory(categoryID: number): void {
    this.categoryService.deleteCategory(categoryID).subscribe(data => console.log("returned data " + data));
  }


  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories.items);
  }

}