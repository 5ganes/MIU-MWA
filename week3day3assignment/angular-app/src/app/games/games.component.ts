import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  title = 'Game List';

  games: any;

  constructor(service: GamesDataService) {
    service.getGames().subscribe(data => {
      console.log(data);
      this.games = data;
    });
    // console.log(this.games.finally());
  }

  ngOnInit(): void {

  }

}

export class Game {
  title!: string;
  price!: number;
  year!: number;
}
