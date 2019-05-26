import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameService) { }

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
        "Too Easy",
        "Easy",
        "Medium",
        "Hard",
        "No Mercy"
      ]

      difficultySetting.innerHTML = difficultySettings[Math.floor(this.value / 10)];
    }
  }

  startGame() {

  }

}
