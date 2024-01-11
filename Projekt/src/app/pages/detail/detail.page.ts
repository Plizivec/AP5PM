import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/games/games.service';

interface Platform {
  platform: {
    name: string;
    // Add other properties if needed
  };
  released_at?: string | null;
  requirements?: {
    minimum: string;
    recommended: string;
  } | null;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  gameId!: string;
  gameDetail: any = {};
  platforms?: Platform[];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    // Using non-null assertion operator
    this.gameId = this.route.snapshot.paramMap.get('gameId')!;
    
    // Rest of your code
    if (this.gameId !== null) {
      // Fetch game details
      this.gameService.getGameDetail(this.gameId).subscribe((data) => {
        if (data.description) {
          // Use a regular expression to split the description based on language changes
          const descriptionParts = data.description.split('Español');

          // Use only the part before the first language change
          this.gameDetail = {
            ...data,
            description: descriptionParts[0].trim(),
          };

          this.gameDetail = {
            ...data,
            description: descriptionParts[0].trim(),
            minimum_requirements: data.requirements?.minimum || 'Not available',
            recommended_requirements: data.requirements?.recommended || 'Not available',
          };
    
          // Update router navigation
          this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
          });
        }
      });

      // Fetch platforms
      this.gameService.getPlatforms(this.gameId).subscribe((platformsData) => {
        this.gameDetail.platforms = platformsData;
      });

      // Fetch genre details
      this.gameService.getGenres().subscribe((genresData) => {
        const genreId = this.gameDetail.genre_id; // Replace with the actual property name from your data
        this.gameService.getGenreDetail(genreId).subscribe((genreDetail) => {
          // Assign the genre details to the gameDetail object
          this.gameDetail.genreDetail = genreDetail;
        });
      });
    }
  }

  getFormattedPlatforms(): string {
    if (this.gameDetail && this.gameDetail.platforms) {
      return this.gameDetail.platforms.map((platform: Platform) => platform.platform.name).join(', ');
    } else {
      return 'Not available';
    }
  }

  getPCRequirements(): string {
    if (this.gameDetail && this.gameDetail.platforms) {
      const pcPlatform = this.gameDetail.platforms.find((platform: Platform) =>
        platform.platform.name.toLowerCase() === 'pc'
      );
  
      if (pcPlatform) {
        const minimumRequirements = pcPlatform.requirements?.minimum || 'Not available';
        const recommendedRequirements = pcPlatform.requirements?.recommended || 'Not available';
  
        return `${minimumRequirements}<br><br>${recommendedRequirements}`;
      }
    }
  
    return 'Not available';
  }

}