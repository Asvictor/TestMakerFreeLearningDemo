var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
//import the application specific components
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { QuizListComponent } from './components/quiz/quiz-list.component'; //the TS file for hosting the quiz component class
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizEditComponent } from './components/quiz/quiz-edit.component';
import { QuestionListComponent } from './components/question/question-list.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { QuestionEditComponent } from './components/question/question-edit.component';
import { AnswerListComponent } from './components/answer/answer-list.component';
import { AnswerEditComponent } from './components/answer/answer-edit.component';
import { ResultListComponent } from './components/result/result-list.component';
import { ResultEditComponent } from './components/result/result-edit.component';
import { QuizSearchComponent } from './components/quiz/quiz-search.component';
var AppModuleShared = /** @class */ (function () {
    function AppModuleShared() {
    }
    AppModuleShared = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                NavMenuComponent,
                HomeComponent,
                QuizListComponent,
                QuizComponent,
                QuizEditComponent,
                QuestionListComponent,
                QuestionEditComponent,
                AnswerListComponent,
                AnswerEditComponent,
                ResultListComponent,
                ResultEditComponent,
                QuizSearchComponent,
                AboutComponent,
                LoginComponent,
                PageNotFoundComponent
            ],
            imports: [
                CommonModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule.forRoot([
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: HomeComponent },
                    { path: 'quiz/create', component: QuizEditComponent },
                    { path: 'quiz/edit/:id', component: QuizEditComponent },
                    { path: 'quiz/:id', component: QuizComponent },
                    { path: 'question/create/:id', component: QuestionEditComponent },
                    { path: 'question/edit/:id', component: QuestionEditComponent },
                    { path: 'answer/create/:id', component: AnswerEditComponent },
                    { path: 'answer/edit/:id', component: AnswerEditComponent },
                    { path: 'result/create/:id', component: ResultEditComponent },
                    { path: 'result/edit/:id', component: ResultEditComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'login', component: LoginComponent },
                    { path: '**', component: PageNotFoundComponent }
                ])
            ],
            providers: [
                AuthService
            ]
        })
    ], AppModuleShared);
    return AppModuleShared;
}());
export { AppModuleShared };
//# sourceMappingURL=app.module.shared.js.map