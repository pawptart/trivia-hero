import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  gameScore: number;
  questionAmount: number;
  scorePercentage: number;

  ngOnInit() {
    this.gameScore = +this.route.snapshot.paramMap.get('score');
    this.questionAmount = +this.route.snapshot.paramMap.get('questions');

    this.calcPercent();
  }

  calcPercent() {
    this.scorePercentage = Math.floor((this.gameScore / this.questionAmount) * 100);
  }

}
