import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss'],
})
export class WeatherModalComponent {
  @Input() games: any[] = [];

  constructor(private modalCTRL: ModalController) {}

  dismissModal() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submit() {
    const selectedItems = this.games.filter((item) => item.checked);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    this.modalCTRL.dismiss(selectedItems, 'location');
  }

  ngOnInit() {
    console.log('Received games:', this.games);
  }
}