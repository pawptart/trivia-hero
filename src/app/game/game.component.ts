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
      });
  }
}
