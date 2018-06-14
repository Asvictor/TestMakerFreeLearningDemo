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
import { Component, Inject } from "@angular/core"; //, Input
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
var QuizComponent = /** @class */ (function () {
    function QuizComponent(activatedRoute, router, http, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.quiz = {};
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log(id);
        if (id) {
            // TO-DO: load the quiz using server- side API
            var url = this.baseUrl + "api/quiz/" + id;
            this.http.get(url).subscribe(function (result) {
                _this.quiz = result;
            }, function (error) { return console.error(error); });
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(["home"]);
        }
    }
    QuizComponent.prototype.onEdit = function () {
        this.router.navigate(["quiz/edit", this.quiz.Id]);
    };
    QuizComponent.prototype.onDelete = function () {
        var _this = this;
        if (confirm("Do you really want to delete this quiz?")) {
            var url = this.baseUrl + "api/quiz/" + this.quiz.Id;
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Quiz " + _this.quiz.Id + " has been deleted.");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
    };
    QuizComponent = __decorate([
        Component({
            selector: "quiz",
            templateUrl: './quiz.component.html',
            styleUrls: ['./quiz.component.css']
        }),
        __param(3, Inject('BASE_URL')),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            HttpClient, String])
    ], QuizComponent);
    return QuizComponent;
}());
export { QuizComponent };
//# sourceMappingURL=quiz.component.js.map