import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './components/card/card.component';
import { CardExpenseComponent } from 'src/app/shared/card-expense/card-expense.component';
import { CategoryComponent } from './core/category/category.component';
import { CategoryDialogComponent } from './core/dialogs/category-dialog/category-dialog.component';
import { ConfigComponent } from 'src/app/services/config/config.component';
import { FormsModule } from '@angular/forms';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { HomeComponent } from './core/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from 'src/app/components/main-nav/main-nav.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './shared/test/test.component';
import { ProfileComponent } from './core/profile/profile.component';
import { ProfileCardComponent } from './core/profile/profile-card/profile-card.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'profile', component: ProfileComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardExpenseComponent,
    CategoryComponent,
    CategoryDialogComponent,
    ConfigComponent,
    GridListComponent,
    HomeComponent,
    MainNavComponent,
    ProfileComponent,
    ProfileCardComponent,
    TestComponent
    ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    
    ReactiveFormsModule
  ],

  exports: [
    MatFormFieldModule

  ],

  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],

  entryComponents: [
    CategoryDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

export class MaterialModule { }