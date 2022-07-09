import { AfterViewInit, Component,  OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from '@angular/material/paginator';
//import {MatSort} from '@angular/material/sort';

import { Transaction } from "./transaction";
import { TransactionService } from "./transaction.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[];
  displayedColumns: string[] = ["date", "category", "name", "type", "value", "comment"];

  //@ViewChild(MatSort) sort: MatSort;

  constructor(private transactionsService: TransactionService) {}

  ngOnInit() {
    this.getTransactions();
    }

  getTransactions(): void {
    this.transactionsService.getTransactions().subscribe((data) => {
      this.transactions = data.items;
    });
  }
}
