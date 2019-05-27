import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuestionList } from '../question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  categoryId: number;
  type: string;
  amount: number;
  difficulty: string;
  questionList: QuestionList;
  currentQuestion: Object;
  currentQuestionIndex: number;
  lockAnswers: boolean;

  constructor(
    public gameService: GameService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.retrieveParams();
    this.startGame(this.amount, this.categoryId, this.difficulty, this.type);
  }

  retrieveParams() {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
    this.amount = +this.route.snapshot.paramMap.get('amount');
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.type = this.route.snapshot.paramMap.get('type');
  }

  startGame(amount, categoryId, difficulty, type) {
    this.gameService.startGame(amount, categoryId, difficulty, type)
      .subscribe( (data: QuestionList) => {
        this.questionList = { 
          response_code: data.response_code,
          results: data.results
        };

        this.questionList = this.gameService.randomizePossibleAnswers(this.questionList);
        this.currentQuestion = this.questionList.results[0];
        this.currentQuestionIndex = 0;
      });
  }

  checkAnswer(index) {
    
    if (!this.lockAnswers) {
      var answerButtons = document.getElementsByTagName("li");
      
      for (let i = 0; i < this.currentQuestion.possible_answers.length; i++) {
        if (this.currentQuestion.possible_answers[i] == this.currentQuestion.correct_answer) {
          var correctIndex = i;
          break;
        }
      }

      if (this.currentQuestion.possible_answers[index] != this.currentQuestion.correct_answer) {
        answerButtons[index].className = "answer incorrect";
        answerButtons[correctIndex].className = "answer correct";
      } else {      
        answerButtons[correctIndex].className = "answer correct";
      }      

      setTimeout(() => this.nextQuestion(), 2000);
    }

    this.lockAnswers = true;
  }

  nextQuestion() {

    // Fixes bug where answers stayed highlighted if True/False back to back.
    var answerButtons = document.getElementsByTagName("li");
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].className = "answer";
    }

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex == this.questionList.results.length) {
      this.endGame();
    }
    this.currentQuestion = this.questionList.results[this.currentQuestionIndex];
    this.lockAnswers = false;
  }

  endGame() {
    console.log("the game is over!");
  }
}
