import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { QuestionList } from '../question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameService) { }

  questionList: QuestionList;

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
      ]

      difficultySetting.innerHTML = difficultySettings[Math.floor(this.value / 20)];
    }
  }

  startGame() {
    var amountSlider = document.getElementById("amount-slider");
    var difficultySlider = document.getElementById("difficulty-slider");
    var radioList = document.getElementsByClassName("radio");

    for (let i = 0; i < radioList.length; i++) {
      if (radioList[i].checked) {
        var type = radioList[i].defaultValue;
      }
    }

    const amount = amountSlider.value;

    const difficultySettings = [
      "Easy",
      "Medium",
      "Hard"
    ];

    const difficulty = difficultySettings[Math.floor(this.value / 20)];

    this.gameService.getQuestions(amount, null, difficulty, type)
      .subscribe( (data: QuestionList) => {
        this.questionList = { 
          response_code: data.response_code,
          results: data.results
        };
      });
  }

}
