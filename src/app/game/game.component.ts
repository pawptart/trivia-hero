import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { QuestionList } from '../question';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  questionList: QuestionList;
  possibleAnswers: Array<string>;

  ngOnInit() {
    this.displaySliderValues();
  }

  displaySliderValues() {
    var amountSlider = document.getElementById("amount-slider");
    var difficultySlider = document.getElementById("difficulty-slider");
    var amountQuestions = document.getElementById("amount-questions");
    var difficultySetting = document.getElementById("difficulty-setting");

    amountSlider.oninput = function() {
      amountQuestions.innerHTML = this.value;
    }
    
    difficultySlider.oninput = function() {
      var difficultySettings = [
        "Easy",
        "Medium",
        "Hard"
      ];

      difficultySetting.innerHTML = difficultySettings[Math.floor(this.value / 20)];
    }
  }

  startGame() {
    this.showMenu = false;
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
