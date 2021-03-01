import { Component, OnInit, Inject } from '@angular/core';
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

  categories: Category[];

  newCategory: Category;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories.items);
  }

  addCategory(): void {

    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: '450px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log("result: " + result);
      let a = result;
      // this.newCategory.name = result.name;
      // this.newCategory.description = result.description;
      // this.newCategory.hierarchy = result.hierarchy;
    });

  }
}