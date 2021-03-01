import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../category/category';
//import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {

  name: string;
  descritpion: string;
  hierarchy: number;
  
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }
    // @Inject(MAT_DIALOG_DATA) public data: {name: string, description: string}) { }

  createCategory(): void {
    console.log(" >>>>>>>>>>>>>>>>> " + this.name);
    this.dialogRef.close();
  }

}

