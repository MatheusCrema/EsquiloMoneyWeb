import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, dataJarbas } from '../../category/category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})

export class CategoryDialogComponent {
  constructor(

    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category) { }

  createCategory(): void {
    this.dialogRef.close(this.category);
  }
}

