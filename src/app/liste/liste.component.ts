import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  produits: any;

  delete2 =  gql`
              mutation delete1($id: ID!)  {
                deleteProduit(id : $id)
              }
           `;
  requete1 = gql`
        query qq {
                      getAllProduit {
                        id
                        description
                        prix
                        categorie {
                          id
                          description
                        }
                      }
                    }
        `;
  constructor(private apollo: Apollo, private httpLink: HttpLink, public route: Router) {
    this.getTousLesProduits();
  }

  deleteproduit1(id1) {
    const confirmation = window.confirm('Vous voulez bien supprimer ce produit ??');
    if (confirmation === true) {
          this.apollo.mutate({
            variables: { id: id1 },
            mutation:  this.delete2,
          }).subscribe( data => {
            console.log(data);
            this.getTousLesProduits();
          });
    }
  }

  getTousLesProduits() {
    this.produits = null;
    this.apollo
      .query({
        query: this.requete1,
        fetchPolicy: 'network-only',  // permet la mise à jour apres modification
      })
      .subscribe(data => {
        console.log(data.data.getAllProduit);
        this.produits = data.data.getAllProduit;
      });
  }

  ngOnInit() {
  }

}
