import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categorias: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categorias => this.categorias = categorias);
  }

}
