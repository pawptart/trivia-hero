import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  gameId: number;

  constructor(
    public gameService: GameService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.displaySliderValues();
    this.gameId = +this.route.snapshot.paramMap.get('id');
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

  startGame = () => this.gameService.startGame();

}
