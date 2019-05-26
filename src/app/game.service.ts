import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  
  getQuestions(number: number = 10, category: number = null, difficulty: string = null, type: string = null) {
    let questionUrl = "https://opentdb.com/api.php?amount=";

    questionUrl += number;

    if (category) {
      questionUrl += `&category=${category}`;
    }

    if (difficulty) {
      questionUrl += `&difficulty=${difficulty}`;
    }

    if (type && type !== 'any') {
      questionUrl += `&type=${type}`;
    }

    return this.http.get(questionUrl);

  }
}
