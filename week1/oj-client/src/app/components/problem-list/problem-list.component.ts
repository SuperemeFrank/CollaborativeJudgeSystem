import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  constructor(@Inject("data") private data) { }  // get data

  ngOnInit() {
    this.getProblems();
  }
  getProblems(): void {
    this.problems = this.data.getProblems();
  }

}
