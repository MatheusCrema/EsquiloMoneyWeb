import { Component, OnInit, Inject, Injectable } from "@angular/core";
import { Account, AccountResult } from "./account";
import { AccountService } from "src/app/core/account/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.accountService
      .getCategories()
      .subscribe((accounts) => (this.accounts = accounts.items));
  }

}
