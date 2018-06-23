import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];

  subcriptionProblems: Subscription;

  constructor(@Inject("data") private data) { }  // get data

  ngOnInit() {
    this.getProblems();
  }
  getProblems(): void {
    this.problems = this.data.getProblems()
                              .subscribe(problems => this.problems = problems);
  }

}
