import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GamesComponent
      },
      // {
      //   path: "**",
      //   component: ErrorPageComponent
      // }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
