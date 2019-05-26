import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  questionUrl = "https://opentdb.com/api.php?amount=";
  getQuestions(number: number = 10, category: number = null, difficulty: string = null, type: string = null) {
    
    this.questionUrl += number;

    if (category) {
      this.questionUrl += `&category=${category}`;
    }

    if (difficulty) {
      this.questionUrl += `&difficulty=${difficulty}`;
    }

    if (type) {
      this.questionUrl += `&type=${type}`;
    }

    return this.http.get(this.questionUrl);

  }
}
