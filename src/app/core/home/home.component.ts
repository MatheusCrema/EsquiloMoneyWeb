import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category, CategoryResult } from 'src/app/core/category/category';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.getCategories();
    console.log("teeeeeeeeste: " + this.categories);

  }

  getCategories(): void {
    this.homeService.getCategories()
      .subscribe(data => this.categories = data.items);
  }

}
