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
      category: [""],
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
    this.categoryService.deleteCategory(categoryID);

    //exclude delete record
    this.categories = this.categories.filter(
      (item) => item.categoryID !== categoryID
    );
  }

  getCategories(): void {
    this.categoryService
      .getCategories("name", this.maxPageSize, null)
      .subscribe((categories) => {
        this.fullCategoriesList = categories.items;
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
