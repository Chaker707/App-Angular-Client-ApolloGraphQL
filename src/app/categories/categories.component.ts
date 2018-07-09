import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  produits: any;
  id: number=1;

  delete2 =  gql`
              mutation delete1($id: ID!)  {
                deleteProduit(id : $id)
              }
           `;
  requete1 = gql`
        query qq2 ($id: ID!) {
            getAllProduitByCat (id: $id) {
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
  constructor(private apollo: Apollo, private httpLink: HttpLink, public route: Router,
    private actRoute: ActivatedRoute) {

    this.id=actRoute.snapshot.params['id'];
    console.log("rrrrrrrrrrrr=>"+this.id)

  }

  deleteproduit1(id1) {
    const confirmation = window.confirm('Vous voulez bien supprimer ce produit ??');
    if (confirmation === true) {
          this.apollo.mutate({
            variables: { id: id1 },
            mutation:  this.delete2,
          }).subscribe( data => {
            console.log(data);
            this.getTousLesProduitsByCat(this.id);
          });
    }
  }



  getTousLesProduitsByCat(id2) {
    this.produits = null;
    this.apollo
      .query({
        variables:{id: id2},
        query: this.requete1,
        fetchPolicy: 'network-only',  // permet la mise à jour apres modification
      })
      .subscribe(data => {
        console.log(data.data);
        this.produits = data.data;
      });
  }

  ngOnInit() {
    console.log("pppppppppppppppppppp")
    this.getTousLesProduitsByCat(this.id);
  }

}
