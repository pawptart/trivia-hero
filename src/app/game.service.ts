import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionList } from './question';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  questionList: QuestionList;
  possibleAnswers: Array<string>;

  constructor(private http: HttpClient) { }

  public getQuestions(number: number = 10, category: number = null, difficulty: string = null, type: string = null) {
    let questionUrl = "https://opentdb.com/api.php?amount=";

    questionUrl += number;

    if (category) {
      questionUrl += `&category=${category}`;
    }

    if (difficulty) {
      questionUrl += `&difficulty=${difficulty.toLowerCase()}`;
    }

    if (type && type !== 'any') {
      questionUrl += `&type=${type}`;
    }

    return this.http.get(questionUrl);

  }

  startGame(amount, categoryId, difficulty, type) {
    return this.getQuestions(amount, categoryId, difficulty, type);
  }

  randomizePossibleAnswers(questionList) {
    for (let i = 0; i < questionList.results.length; i++) {

      // Create an array of possible answers
      let possibleAnswers = []
      possibleAnswers.push({
        answer: questionList.results[i].correct_answer,
        state: "neutral"
      });
      possibleAnswers.push(...questionList.results[i].incorrect_answers.map((answer: string) => {
        return {
          answer: answer,
          state: "neutral"
        };

      }));

      // Shuffle the array of possible answers
      for (let i = possibleAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possibleAnswers[i], possibleAnswers[j]] = [possibleAnswers[j], possibleAnswers[i]];
      }

      // Put it in the questionList object
      questionList.results[i].possible_answers = possibleAnswers;
    }

    return questionList
  }

}
