import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ICategory } from '../category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(public categoriesService: CategoriesService) { }

  triviaCategories: ICategory;
  categoryNotSelected: Boolean = true;
  categoryClass: String;
  sortedCategories: Array<any>;

  ngOnInit() {
    this.showCategories();
  }

  showCategories() {
    this.categoriesService.getCategories()
      .subscribe( (data: ICategory) => {
        this.triviaCategories = {
          trivia_categories: data.trivia_categories
        };
      });
  }

  selectCategory(categoryClass) {
    this.categoryNotSelected = false;
    this.categoryClass = categoryClass;
    this.sortCategories(categoryClass);
  }

  goBack() {
    this.categoryNotSelected = !this.categoryNotSelected;
  }

  sortCategories(categoryClass) {
    this.sortedCategories = [];

    var categoryRegex = new RegExp(categoryClass, 'i');

    if (categoryClass && categoryClass !== 'other') {
      let category: any;
      for (category of this.triviaCategories.trivia_categories) {
        if (category.name.match(categoryRegex)) {
          this.sortedCategories.push(category);
        }
      }
    } else if (categoryClass === 'other') {
      let category: any;
      for (category of this.triviaCategories.trivia_categories) {
        if (!category.name.match(':') && category.name !== 'General Knowledge' && !category.name.match('Science')) {
          this.sortedCategories.push(category);
        }
      }
    } else {
      console.log('There was an error retrieving trivia categories.')
    }
  }

}
