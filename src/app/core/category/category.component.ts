import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { Category, CategoryResult } from "./category";
import { CategoryService } from "src/app/core/category/category.service";
//import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryDialogComponent } from "../dialogs/category-dialog/category-dialog.component";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
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

  fullCategoriesList: Category[];
  categories: Category[];
  filteredCategories: Category[];

  search = new FormControl("");
  searchOptions: string[];
  searchOptionsFull: string[];

  formGroup: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCategories();
    //this.searchCategories();
  }

  initForm() {
    this.formGroup = this.fb.group({
      category: [""],
    });
    this.formGroup.get("category").valueChanges.subscribe((response) => {
      this.filteredOptions(response);

      if (!!response) {
        this.categories = this.fullCategoriesList.filter((category) => {
          return (
            category.name.toLowerCase().indexOf(response.toLowerCase()) > -1
          );
        });
      } else {
        this.categories = this.fullCategoriesList;
      }
    });
  }

  filteredOptions(enteredData) {
    this.searchOptions = this.searchOptionsFull.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
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
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories.items;
      this.fullCategoriesList = categories.items;

      this.searchOptionsFull = categories.items.map(item => item["name"]);
    });
  }

  // searchCategories(): void {
  //   this.categoryService
  //     .getCategories()
  //     .subscribe(
  //       (searchOptions) =>
  //         (this.searchOptions = searchOptions.items.map(
  //           (category) => category["name"]
  //         ))
  //     );
  // }
}

export interface User {
  name: string;
}
