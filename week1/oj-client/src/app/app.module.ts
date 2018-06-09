import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from "./app.routes";
import { DataService } from "./services/data.service";
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing
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
