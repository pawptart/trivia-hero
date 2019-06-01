import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

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
  currentQuestion: any;
  currentQuestionIndex: number;
  lockAnswers: boolean;
  gameScore: number;

  constructor(
    public gameService: GameService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveParams();
    this.startGame(this.amount, this.categoryId, this.difficulty, this.type);
    this.gameScore = 0;
  }

  retrieveParams() {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
    this.amount = +this.route.snapshot.paramMap.get('amount');
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.type = this.route.snapshot.paramMap.get('type');
  }

  public startGame(amount: number, categoryId: number, difficulty: string, type: string) {
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
      let correctIndex: number = 
        this.currentQuestion.possible_answers.findIndex((answer: any) => 
          answer.answer === this.currentQuestion.correct_answer);

      if (this.currentQuestion.possible_answers[index].answer !== this.currentQuestion.correct_answer) {
        this.currentQuestion.possible_answers[index].state = false;
      } else {
        this.gameScore += 1
      }
      
      this.currentQuestion.possible_answers[correctIndex].state = true;
            

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
      this.endGame(this.gameScore, this.questionList.results.length);
    } else {
      this.currentQuestion = this.questionList.results[this.currentQuestionIndex];
      this.lockAnswers = false;
    }
  }

  endGame(score: number, questions: number) {
    this.router.navigateByUrl(`/scoreboard/${score}/${questions}`);
  }
}
