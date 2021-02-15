import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './components/card/card.component';
import { CardExpenseComponent } from 'src/app/shared/card-expense/card-expense.component';
import { CategoryComponent } from './category/category.component';
import { ConfigComponent } from 'src/app/services/config/config.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from 'src/app/components/main-nav/main-nav.component';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
  MatCardModule, MatChipsModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: GridListComponent },
  { path: 'category', component: CategoryComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CardExpenseComponent,
    MainNavComponent,
    GridListComponent,
    CardComponent,
    CategoryComponent,
    ConfigComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
