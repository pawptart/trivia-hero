import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  questionsUrl = "https://opentdb.com/api_count_global.php";

  getQuestions() {
    return this.http.get(this.questionsUrl);
  }

}
