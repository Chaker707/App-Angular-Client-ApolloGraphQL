import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

interface Produit1 {
  id: number;
  description: string;
  prix: number;
  idcat: number;

}

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})


export class AjoutComponent implements OnInit {
  constructor(private apollo: Apollo, private httpLink: HttpLink, public route: Router) {
  }

  prod1 = {  description: '' ,  prix : 0 ,     id_categorie : 1   };
  listecat: any;

  ngOnInit() {

    this.apollo
      .query({
        query: gql`
         query qq{
          getAllcategorie{
            id
            description
          }
        }
        `,
      })
      .subscribe(data => {
        console.log(data.data.getAllcategorie);
        this.listecat = data.data.getAllcategorie;
      });

  }

  ajouterproduit() {
    this.apollo.mutate({
      variables: { desc: this.prod1.description, prix: this.prod1.prix, idcat: this.prod1.id_categorie },
      mutation:  gql`
          mutation ajouter1($desc: String!, $prix: Float!, $idcat: ID!){
            addProduit(description:$desc,prix: $prix, categorie: $idcat){
              id
              description
          }
        }
       `,
    }).subscribe( data => {
      console.log(data);
      this.route.navigate(['liste']);
    });
 }



}
