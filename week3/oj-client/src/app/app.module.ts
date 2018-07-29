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
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditorComponent } from './components/editor/editor.component';
import { CollaborationService } from './services/collaboration.service';
import { SearchPipe } from './pipes/search.pipe';
import { InputService } from './services/input.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent,
    EditorComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: "data",
      useClass: DataService   // make service global
    },
    AuthService,
    {
      provide: "auth",
      useClass: AuthService
    },
    {
      provide: "authGuard",
      useClass: AuthGuardService
    },
    {
      provide: "collaboration",
      useClass: CollaborationService
    },
    {
      provide: "input",
      useClass: InputService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
