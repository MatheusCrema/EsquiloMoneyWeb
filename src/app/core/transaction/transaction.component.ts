import { Component, OnInit } from "@angular/core";


import { Transaction } from "./transaction";
import { TransactionService } from "./transaction.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[];
  displayedColumns: string[] = ["date", "name", "value", "comment"];

  constructor(private transactionsService: TransactionService) {}

  ngOnInit() {
    this.getTransactions();
    }

  getTransactions(): void {
    this.transactionsService.getTransactions().subscribe((data) => {
      this.transactions = data.items;
      console.log(">>>>>> data: " + data.items.length);
      console.log(">>>>>> data: " + data.items[0].name);
      console.log(">>>>>>>>>>>> why >> " + this.transactions[0].name);
    });
  }
}
