import { Component, OnInit, Inject, Injectable } from "@angular/core";

import { Identity } from "../identity/identity";
import { ProfileService } from "src/app/core/profile/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  identities: Identity[];
  itemsCount: number;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getIdentities();
  }

  getIdentities(): void {
    this.profileService
      .getIdentities()
      .subscribe((data) => {
        this.identities = data.items;
      });
  }

  deleteIdentity(identityID: number): void {
    this.profileService.deleteIdentity(identityID);
  }

}
