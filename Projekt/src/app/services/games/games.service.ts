import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiKey = 'cb10754f15ec4a05ad334d5f5c0029f8'; // Replace with your actual API key
  private apiUrl = 'https://api.rawg.io/api/games';
  private genreApiUrl = 'https://api.rawg.io/api/genres';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        key: this.apiKey,
        // Add any additional parameters based on the game API documentation
      },
    });
  }


  getGameDetail(gameId: string): Observable<any> {
    const detailUrl = `${this.apiUrl}/${gameId}`;
  
    return this.http.get(detailUrl, {
      params: {
        key: this.apiKey,
        // Add any additional parameters for game details
      },
    });
  }

  getGenres(): Observable<any> {
    return this.http.get(this.genreApiUrl, {
      params: {
        key: this.apiKey,
      },
    });
  }

  getGenreDetail(id: number): Observable<any> {
    const url = `${this.genreApiUrl}/${id}`;
    return this.http.get(url, {
      params: {
        key: this.apiKey,
      },
    });
  }

  // Add a method to get platforms
  getPlatforms(gameId: string): Observable<any> {
    const url = `${this.apiUrl}/games/${gameId}/platforms`;
    return this.http.get(url, { params: { key: this.apiKey } });
  }

}