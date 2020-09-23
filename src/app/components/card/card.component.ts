import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() {
  }
  
  ngOnInit() {
  }
  
  expenseValue = 500;    

  onClickMe() {
    var test = document.getElementById("valor").innerHTML;

    alert("Teste: " + test);
    //this.expenseValue = parseFloat((document.getElementById("valor").innerText));
  }




}
