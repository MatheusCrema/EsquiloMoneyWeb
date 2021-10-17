import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Identity } from "../identity/identity";
import { ProfileService } from "src/app/core/profile/profile.service";
import { ProfileCardComponent } from "./profile-card/profile-card.component";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  identities: Identity[];
  itemsCount: number;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  identity: Identity;
  createdIdentity: Identity

  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getIdentities();
  }

  addProfile(): void {
    const dialogRef = this.dialog.open(ProfileCardComponent, {
      height: "450px",
      width: "480px",
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.identity = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phone: result.phone,
        createdDT: new Date(),       
      };

      var ret = this.profileService
        .addIdentity(this.identity)
        .subscribe((result) => (this.createdIdentity = result));

    });
  }

  getIdentities(): void {
    this.profileService.getIdentities().subscribe((data) => {
      this.identities = data.items;
    });
  }

  deleteIdentity(identityID: number): void {
    this.profileService.deleteIdentity(identityID);
  }
}
