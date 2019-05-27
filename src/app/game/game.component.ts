import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

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

  ngOnInit() {
  }

}
