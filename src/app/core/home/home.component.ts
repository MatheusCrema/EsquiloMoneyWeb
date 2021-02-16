import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/category/category';
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
  }

  getCategories(): void {
    this.homeService.getCategories()
    .subscribe(categories => this.categories = categories.items);
  }

}
