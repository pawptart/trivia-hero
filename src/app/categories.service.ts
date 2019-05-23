import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  triviaCategories: ICategory;

  categoryUrl = "https://opentdb.com/api_category.php"

  getCategories() {
    return this.http.get(this.categoryUrl);
  }

}
