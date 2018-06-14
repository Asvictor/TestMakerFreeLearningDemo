var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject, Input } from "@angular/core"; //import existing function from packages
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
/**
 * The selector, which gives a name to the HTML pseudo-element
 * we'll have to use to include the component within another
 * component's template; in this case, with the given value, it will be
 * <quiz-list></quiz-list>
 */
var QuizListComponent = /** @class */ (function () {
    //use syntactic sugar to create properties
    function QuizListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
    }
    QuizListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("QuizListComponent " +
            " instantiated with the following class: "
            + this.class);
        var url = this.baseUrl + "api/quiz/";
        switch (this.class) {
            case "latest":
            default:
                this.title = "Latest Quizzes";
                url += "Latest/10";
                break;
            case "byTitle":
                this.title = "Quizzes by Title";
                url += "ByTitle/";
                break;
            case "random":
                this.title = "Random Quizzes";
                url += "Random/";
                break;
        }
        this.http.get(url).subscribe(function (result) {
            _this.quizzes = result;
        }, function (error) { return console.error(error); });
    };
    QuizListComponent.prototype.onSelect = function (quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id "
            + this.selectedQuiz.Id
            + " has been selected.");
        this.router.navigate(["quiz", this.selectedQuiz.Id]);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuizListComponent.prototype, "class", void 0);
    QuizListComponent = __decorate([
        Component({
            selector: "quiz-list",
            templateUrl: './quiz-list.component.html',
            styleUrls: ['./quiz-list.component.css'] /* its corresonding style sheet,the expected value is an array, meaning that we
                                                           can split the component styling into multiple CSS files*/
        })
        //class implementation
        ,
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String, Router])
    ], QuizListComponent);
    return QuizListComponent;
}());
export { QuizListComponent };
//# sourceMappingURL=quiz-list.component.js.map