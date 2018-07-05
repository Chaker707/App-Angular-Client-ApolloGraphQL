import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    this.apollo.create({
      link: httpLink.create({uri: 'http://localhost:8080/graphql'}),
      cache: new InMemoryCache(),
    });
  }

}
