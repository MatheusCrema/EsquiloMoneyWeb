import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from 'src/app/category/category.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

}
