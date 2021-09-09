import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Category, CategoryResult } from "./category";
import { CategoryService } from "src/app/core/category/category.service";
//import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CategoryDialogComponent } from "../dialogs/category-dialog/category-dialog.component";
import { timer } from "rxjs";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categoryID: number;

  name: string;
  description: string;
  hierarchy: number;

  category: Category;

  newCategory: Category;

  createdCategory: Category;

  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: "450px",
      width: "480px",
      data: {
        isNew: true,
        name: this.name,
        description: this.description,
        hierarchy: this.hierarchy,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newCategory = {
        name: result.name,
        description: result.description,
        hierarchy: result.hierarchy,

        categoryParentID: null,
        createdDT: new Date(),
      };

      var ret = this.categoryService
        .addCategory(this.newCategory)
        .subscribe((result) => (this.createdCategory = result));

      timer(100000);

      this.getCategories();
    });
  }

  editCategory(editedCategory: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: "450px",
      width: "480px",
      data: {
        isNew: false,
        name: editedCategory.name,
        description: editedCategory.description,
        hierarchy: editedCategory.hierarchy,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.category = {
        categoryID: editedCategory.categoryID,
        name: result.name,
        description: result.description,
        hierarchy: result.hierarchy,
        // categoryParentID: 0,
        // createdDT: new Date(),
      };

      var ret = this.categoryService
        .editCategory(this.category)
        .subscribe((result) => (this.category = result));
    });
  }

  deleteCategory(categoryID: number): void {
    this.categoryService.deleteCategory(categoryID);

    //exclude delete record
    this.categories = this.categories.filter(
      (item) => item.categoryID !== categoryID
    );
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories.items));
  }

  // test: string;
  // test2: any;
  // testService(): void {
  //   //this.categoryService.testCall().subscribe(data => {this.test = data; console.log("VAAAAAAAI: " + data); return data;} );
  //   this.categoryService.testCall().subscribe(
  //     (data) => {
  //       this.test2 = data;
  //     },
  //     (error) => {
  //       console.log("errorOROROOOOOOOOOOOOOOOR: ", error);
  //     }
  //   );
  // }
}
