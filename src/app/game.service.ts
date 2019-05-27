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

  getQuestions(number: number = 10, category: number = null, difficulty: string = null, type: string = null) {
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

  startGame() {
    var amountSlider = document.getElementById("amount-slider");
    var difficultySlider = document.getElementById("difficulty-slider");
    var radioList = document.getElementsByClassName("radio");

    const difficultySettings = [
      "Easy",
      "Medium",
      "Hard"
    ];

    for (let i = 0; i < radioList.length; i++) {
      if (radioList[i].checked) {
        var type = radioList[i].defaultValue;
      }
    }

    const amount = amountSlider.value;
    const categoryId = +this.route.snapshot.paramMap.get('id');
    const difficulty = difficultySettings[Math.floor(difficultySlider.value / 20)];

    this.gameService.getQuestions(amount, categoryId, difficulty, type)
      .subscribe( (data: QuestionList) => {
        this.questionList = { 
          response_code: data.response_code,
          results: data.results
        };

        this.randomizePossibleAnswers();
      });
  }
  
  randomizePossibleAnswers() {
    if (this.questionList) {
      for (let i = 0; i < this.questionList.results.length; i++) {

        // Create an array of possible answers
        var possibleAnswers = []
        possibleAnswers.push(this.questionList.results[i].correct_answer);
        possibleAnswers.push(...this.questionList.results[i].incorrect_answers);

        // Shuffle the array of possible answers
        for (let i = possibleAnswers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [possibleAnswers[i], possibleAnswers[j]] = [possibleAnswers[j], possibleAnswers[i]];  
        }

        // Put it in the questionList object
        this.questionList.results[i].possible_answers = possibleAnswers;
      }
    } else {  
      console.log("Oops! There was an error. Please retry.");
    }
  }

}
