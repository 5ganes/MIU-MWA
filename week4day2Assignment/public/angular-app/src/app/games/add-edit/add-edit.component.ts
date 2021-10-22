import { Component, OnInit } from '@angular/core';
import { GamesDataService } from 'src/app/games-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  pageTitle: string = "Add/Edit Game";

  addUpdateGame: any;
  gameId: any;

  game: any;

  constructor(
    private service: GamesDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  splitCommaSeparatedStrings = function (str: string) {
    let result = new Array();
    if (str && str.length > 0) {
      result = str.split(",");
    }
    else {
      result = [];
    }
    return result;
  }

  onSubmit(form: any) {
    console.log(form.value);
    this.addUpdateGame = {
      title: form.value.title,
      price: parseFloat(form.value.price),
      players: parseInt(form.value.players),
      rate: parseFloat(form.value.rate),
      designers: this.splitCommaSeparatedStrings(form.value.designers),
      publisher: {
        name: form.value.publisherName,
        country: form.value.publisherCountry
      }
    };
    console.log(this.addUpdateGame);
    if (!this.gameId) {
      this.service.addOneGame(this.addUpdateGame).then(response => {
        this.router.navigate(['/games']);
      });
    }
  }

}
