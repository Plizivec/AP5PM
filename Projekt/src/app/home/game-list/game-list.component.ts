import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/games/games.service';
import { ModalController } from '@ionic/angular'; // Import ModalController

interface Game {
  id: number;
  name: string;
  // Add other properties as needed
  checked: boolean;
}

@Component({
  selector: 'app-game-list',
  templateUrl: 'game-list.component.html',
  styleUrls: ['game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  @Input() selectedGames: Game[] = [];
  games: Game[] = [];

  constructor(private modalCTRL: ModalController, private gameService: GameService) {}

  ngOnInit() {
    // Load games when the component initializes
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe((data: { results: Game[] }) => {
      // Use selectedGames to mark previously selected games
      this.games = data.results.map((game) => ({
        ...game,
        checked: this.selectedGames.some((selectedGame) => selectedGame.id === game.id),
      }));
    });
  }

  dismissModal() {
    // Only dismiss the modal without updating the selected games
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submit() {
    const selectedGames = this.games.filter((game) => game.checked);
    this.modalCTRL.dismiss({ selectedGames }, 'submit');
  }

  updateSelectedGames(game: any) {
    game.checked = !game.checked;
  }
}