import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categoryId: number;
  type: string;
  amount: number;
  difficulty: string;

  constructor(
    public gameService: GameService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.displaySliderValues();
    this.categoryId = +this.route.snapshot.paramMap.get('id');
  }

  displaySliderValues() {
    let amountSlider: any = document.getElementById("amount-slider");
    let difficultySlider: any = document.getElementById("difficulty-slider");
    let amountQuestions: any = document.getElementById("amount-questions");
    let difficultySetting: any = document.getElementById("difficulty-setting");

    amountSlider.oninput = function() {
      amountQuestions.innerHTML = this.value;
    }
    
    difficultySlider.oninput = function() {
      let difficultySettings = [
        "Easy",
        "Medium",
        "Hard"
      ];

      difficultySetting.innerHTML = difficultySettings[Math.floor(this.value / 20)];
    }
  }

  submitValues() {
    let amountSlider: any = document.getElementById("amount-slider");
    let difficultySlider: any = document.getElementById("difficulty-slider");
    let radioList: any = document.getElementsByClassName("radio");

    const difficultySettings = [
      "Easy",
      "Medium",
      "Hard"
    ];

    let type: string;
    for (let i = 0; i < radioList.length; i++) {
      if (radioList[i].checked) {
        type = radioList[i].defaultValue;
      }
    }

    this.amount = amountSlider.value;
    this.difficulty = difficultySettings[Math.floor(difficultySlider.value / 20)].toLowerCase();
    this.type = type;

    this.router.navigate(['/game', this.categoryId, this.amount, this.difficulty, this.type]);
  }

}
