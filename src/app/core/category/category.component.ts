import { merge, of } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

import {
  Component,
  OnInit,
  Inject,
  Injectable,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { Category, CategoryResult } from "./category";
import { CategoryService } from "src/app/core/category/category.service";
import { CategoryDialogComponent } from "../dialogs/category-dialog/category-dialog.component";
//import {MatFormFieldModule} from '@angular/material/form-field';

import { MatPaginator, PageEvent } from "@angular/material/paginator";

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
  readonly initialPageSize: number = 30;
  readonly maxPageSize: number = 300;

  categoryID: number;
  name: string;
  description: string;
  hierarchy: number;

  category: Category;
  newCategory: Category;
  createdCategory: Category;

  categoryGroups: Category[];
  categories: Category[];
  fullCategoriesList: Category[];
  inPageCategories: Category[];

  search = new FormControl("");
  formGroup: FormGroup;

  //Paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.formGroup = this.fb.group({
      category: [""]
    });
    this.formGroup.get("category").valueChanges.subscribe((response) => {
      if (!!response) {
        this.categories = this.fullCategoriesList.filter((category) => {
          return (
            category.name.toLowerCase().indexOf(response.toLowerCase()) > -1
          );
        });
      } else {
        this.categories = this.inPageCategories;
      }
    });
  }

  addCategory(categoryGroup: Category[]): void {
    console.log(
      "===========================>>>> before GenerateNestedCategories"
    );
    this.GenerateNestedCategories(this.fullCategoriesList);

    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: "450px",
      width: "480px",
      data: {
        isNew: true,
        name: this.name,
        description: this.description,
        hierarchy: this.hierarchy,
        categoryGroups: categoryGroup,
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
      console.log("============> ENTREI");

      var ret = this.categoryService
        .addCategory(this.newCategory)
        .subscribe((result) => {
          this.fullCategoriesList.push(result);
          this.categories = [result];
        });
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
    this.categoryService.deleteCategory(categoryID).subscribe();

    //exclude delete record
    this.categories = this.categories.filter(
      (item) => item.categoryID !== categoryID
    );
  }

  GenerateNestedCategories(categoryList: Category[]): void {
    console.log(
      "===========================>>>> categoryList.length: ",
      categoryList.length
    );
    var subcategories = categoryList.filter((item) => item.categoryParentID); //!!item.categoryParentID); //item.categoryParentID !== null
    console.log(
      "===========================>>>> subcategories.length: ",
      subcategories.length
    );

    subcategories.forEach((subCategory) => {
      //console.log("================> subcategories.forEach. ID ",subCategory.categoryID, " -- name: ",subCategory.name);
      var parentCategory = categoryList.find(
        (item) => item.categoryID == subCategory.categoryParentID
      );

      if (parentCategory) {
        console.log("================> parentCategory: ", parentCategory.name);
        console.log("================> subCategory: ", subCategory.name);

        if (parentCategory.categories == null) {
          parentCategory.categories = [];
        }
        console.log("================> parentCategory.categories: ",parentCategory.categories.length);

        parentCategory.categories.push(subCategory);
        categoryList.map((item) =>
          item.categoryID !== parentCategory.categoryID ? item : parentCategory
        );
      }
    });

    categoryList.forEach((category) => {
      if (category.categories && category.categories.length) {
        category.categories.forEach((subCategory) => {
          console.log("================>>> Category: ",category.name," /// subCategory: ",subCategory.name);
        });
      }
    });

    this.categoryGroups = categoryList;
  }

  getCategories(): void {
    this.categoryService
      .getCategories("name", this.maxPageSize, null)
      .subscribe((categories) => {
        this.fullCategoriesList = categories.items.sort((a, b) =>
          a.name < b.name ? -1 : 1
        );
        this.categories = this.fullCategoriesList.slice(
          0,
          this.initialPageSize
        );
        this.inPageCategories = this.categories;
        this.length = categories.totalItems;
      });
  }

  getCategoriesPerPage(event?: PageEvent) {
    this.categoryService
      .getCategories("name", event.pageSize, event.pageIndex + 1)
      .subscribe(
        (response) => {
          if (response.error) {
            // handle error
          } else {
            this.categories = response.items;
            this.inPageCategories = response.items;

            //this.pageIndex = event.pageIndex;
            this.pageSize = event.pageSize;
            this.length = response.totalItems;
          }
        },
        (error) => {
          // handle error
        }
      );
    return event;
  }
}

export interface User {
  name: string;
}
