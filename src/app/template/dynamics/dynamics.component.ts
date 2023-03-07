import { Component } from '@angular/core';

interface Person {
  name: string;
  favorites: Favorite[]
}

interface Favorite {
  id: number;
  name: string
}
@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent {
  newGame: string = '';
  person: Person = {
    name: 'Juan',
    favorites: [
      {id: 1, name: 'Assassins Creed'},
      {id: 2, name: 'Marvel: Spiderman'},
    ]
  }

  addGame() {
    const newFavorite: Favorite = {
      id: this.person.favorites.length +1,
      name: this.newGame
    }

    this.person.favorites.push( {...newFavorite });
    this.newGame = '';
  }

  delete( index: number){
    this.person.favorites.splice(index, 1)
  }


  save() {
    console.log('form posted');
  }

}
