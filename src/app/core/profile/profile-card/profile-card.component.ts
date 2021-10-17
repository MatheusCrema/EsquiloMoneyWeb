import { Component, Inject, OnInit } from "@angular/core";
import { Identity } from "../../identity/identity";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.css"],
})
export class ProfileCardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProfileCardComponent>,
    @Inject(MAT_DIALOG_DATA) public identity: Identity
  ) {}

  ngOnInit(): void {}

  addProfile(): void {
    this.dialogRef.close(this.identity);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
