// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    console.log('Dark Mode:', this.darkMode);
  }

  isDarkMode() {
    console.log('Is Dark Mode:', this.darkMode);
    return this.darkMode;
  }

  private applyTheme() {
    const elementsToApplyTheme = [
      'ion-header',
      'ion-content',
      'ion-button',
      'ion-item',
    ];

    elementsToApplyTheme.forEach((elementSelector) => {
      const elements = document.querySelectorAll(elementSelector);
      elements.forEach((element) => {
        if (this.darkMode) {
          this.renderer.addClass(element, 'dark');
        } else {
          this.renderer.removeClass(element, 'dark');
        }
      });
    });
  }
}