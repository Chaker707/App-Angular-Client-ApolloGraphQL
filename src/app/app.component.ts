import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


type Categorie = {
   id: number;
   description: string;
}
type Requete = {
  allCategories: Categorie[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  categories:any ;

  categorie_req =  gql`
              query qq{
                getAllcategorie{
                  id
                  description
                }
              }
           `;

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    this.apollo.create({
      link: httpLink.create({uri: 'http://localhost:8080/graphql'}),
      cache: new InMemoryCache(),
    });

    this.apollo
      .query({
        query: this.categorie_req,
      })
      .subscribe(data => {
         console.log(data.data);
        this.categories = data.data;
      });
  }


}
