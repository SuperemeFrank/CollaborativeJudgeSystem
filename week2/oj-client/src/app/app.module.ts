import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from "./app.routes";
import { DataService } from "./services/data.service";
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    FormsModule
  ],
  providers: [
    {
      provide: "data",
      useClass: DataService   // make service global
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
