import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public aboutService: AboutService) { }

  questions: number;

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.aboutService.getQuestions()
      .subscribe( (data: any) => {
        this.questions = data.overall.total_num_of_questions;
      });
  }

}
