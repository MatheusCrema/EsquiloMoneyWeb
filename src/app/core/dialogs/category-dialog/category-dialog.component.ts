import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Category } from "../../category/category";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Observable } from "rxjs/internal/Observable";
import { startWith } from "rxjs/internal/operators/startWith";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-category-dialog",
  templateUrl: "./category-dialog.component.html",
  styleUrls: ["./category-dialog.component.css"],
})
export class CategoryDialogComponent {
  categoryParentForm: FormGroup;
  categoryOptions: Category[];
  
  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category,
    //@Inject(MAT_DIALOG_DATA) public categoryGroup: categoryGroups,
    private fb: FormBuilder
  ) {}



  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;



  ngOnInit() {
    //this.initForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  initForm() {
    this.categoryParentForm = this.fb.group({
      categoryGroup: [""],
    });

    this.categoryParentForm
      .get("categoryGroup")
      .valueChanges.subscribe((response) => {
        this.categoryOptions = [];
        this.categoryOptions[0] = {
          categoryID: 1,
          name: "string",
          description: "description",
          hierarchy: 0
        };
      });
  }

  createCategory(): void {
    //this.categoryParentForm.get("categoryGroup").setValue(this.)
    this.dialogRef.close(this.category);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
