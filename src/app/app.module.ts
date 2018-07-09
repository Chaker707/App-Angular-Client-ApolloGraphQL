import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { ListeComponent } from './liste/liste.component';
import { AjoutComponent } from './ajout/ajout.component';
import {RouterModule, Routes} from '@angular/router';


import {HttpClientModule} from '@angular/common/http';


import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';

import {InMemoryCache} from 'apollo-cache-inmemory';
import {FormsModule} from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';


const mesRoutes: Routes = [
  { path : 'liste' , component: ListeComponent },
  { path : 'categories/:id' , component:CategoriesComponent },
  { path : 'ajout', component: AjoutComponent },
  { path: '' , redirectTo : '/liste', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    ListeComponent,
    AjoutComponent,
    CategoriesComponent

  ],
  imports: [
    BrowserModule, RouterModule.forRoot(mesRoutes), FormsModule ,
    HttpClientModule,  ApolloModule,    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
