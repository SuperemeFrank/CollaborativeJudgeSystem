import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
import { Http, Response, Headers} from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestOptions } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }
  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: Response) => {
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);

    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res: Response) => res.json())
                    .catch(this.handleError);
  }
  private headers: Headers = new Headers({ 'content-type' : 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers });
  addProblem(problem: Problem): Promise<Problem> {

    return this.http.post('/api/v1/problems', problem, this.options)
      .toPromise()
      .then((res: Response) => {
        this.getProblems(); // to refresh the page
        return res.json();
      })
      .catch(this.handleError);
  }

  // error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }

}
