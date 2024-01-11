import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// this one
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameService } from 'src/app/services/games/games.service';
import { GameListComponent } from 'src/app/home/game-list/game-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,GameListComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
