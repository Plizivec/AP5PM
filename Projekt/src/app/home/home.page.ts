// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';
import { GameListComponent } from 'src/app/home/game-list/game-list.component';
import { PlacesService } from '../services/places/places.service';
import { GameService } from 'src/app/services/games/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gamesDataArray: any[] = [];

  

  constructor(public modalController: ModalController,private router: Router) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: GameListComponent,
      componentProps: {
        selectedGames: this.gamesDataArray,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.selectedGames) {
      this.gamesDataArray = data.selectedGames;
    }
  }

  navigateToDetails(gameId: string) {
    this.router.navigate(['/detail', gameId]);
  }
}