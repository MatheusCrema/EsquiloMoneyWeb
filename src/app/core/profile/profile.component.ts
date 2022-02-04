import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Identity, IdentityResult } from "../identity/identity";
import { ProfileService } from "src/app/core/profile/profile.service";
import { ProfileCardComponent } from "./profile-card/profile-card.component";
import { Observable, BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

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
  refreshIdentities$ = new BehaviorSubject<boolean>(true);
  IdentityResult$: Observable<IdentityResult>;

  identities: Identity[];

  itemsCount: number;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  identity: Identity;
  createdIdentity: Identity;

  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getIdentities();

    // this.IdentityResult$ = this.refreshIdentities$.pipe(
    //   switchMap((_) => this.profileService.getIdentities())
    // );
    // console.log(" >>>>>>>> this.IdentityResult$: " + this.IdentityResult$);
    
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

    this.refreshIdentities$.next(true);
  }

  getIdentities(): void {
    this.profileService.getIdentities().subscribe((identities) => (this.identities = identities.items));
        
    //this.profileService.getIdentities().subscribe();
    
    // this.profileService.getIdentities().subscribe((data) => {
    //   this.identities = data.items;
    // });
  }

  deleteIdentity(identityID: number): void {
    var isDeleted = false;
    isDeleted = this.profileService.deleteIdentity(identityID);
    console.log(">>>>>>>>>>>>>>>>> isDeleted: " + isDeleted);
    this.ngOnInit();
    //if (isDeleted) this.getIdentities(); Not working (isDeleted is coming false - even if condition is removed still doesnt work)
  }
}
