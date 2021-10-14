import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GamesDataService } from 'src/app/games-data.service';

@Component({
  selector: 'app-game-single',
  templateUrl: './game-single.component.html',
  styleUrls: ['./game-single.component.css']
})
export class GameSingleComponent implements OnInit {
  title = "Game Single";
  game: any;

  gameId: any;

  constructor(service: GamesDataService, route: ActivatedRoute) {
    route.paramMap.subscribe(
      params => {
        this.gameId = params.get('gameId');
        console.log(this.gameId);
      }
    )
    service.getSingleGame(this.gameId).subscribe(data => {
      console.log(data);
      this.game = data;
    });
  }

  ngOnInit(): void {
  }

}
