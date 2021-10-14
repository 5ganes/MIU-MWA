import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  title = 'Game List';

  games: any;

  constructor(private service: GamesDataService, private router: Router) {
    service.getGames().subscribe(data => {
      console.log(data);
      this.games = data;
    });
  }

  // getSingle(gameId: string) {
  //   this.router.navigate(['/games/' + gameId]);
  // }

  ngOnInit(): void {

  }

}

export class Game {
  title!: string;
  price!: number;
  year!: number;
}
