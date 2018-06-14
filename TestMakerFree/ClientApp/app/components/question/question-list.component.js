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
import { Component, Inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
var QuestionListComponent = /** @class */ (function () {
    function QuestionListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.questions = [];
    }
    QuestionListComponent.prototype.ngOnChanges = function (changes) {
        if (typeof changes['quiz'] !== "undefined") {
            // retrieve the quiz variable change info
            var change = changes['quiz'];
            // only perform the task if the value has been changed
            if (!change.isFirstChange()) {
                // execute the Http request and retrieve the result
                this.loadData();
            }
        }
    };
    QuestionListComponent.prototype.loadData = function () {
        var _this = this;
        var url = this.baseUrl + "api/question/All/" + this.quiz.Id;
        this.http.get(url).subscribe(function (res) {
            _this.questions = res;
        }, function (error) { return console.error(error); });
    };
    QuestionListComponent.prototype.onCreate = function () {
        this.router.navigate(["/question/create", this.quiz.Id]);
    };
    QuestionListComponent.prototype.onEdit = function (question) {
        this.router.navigate(["/question/edit", question.Id]);
    };
    QuestionListComponent.prototype.onDelete = function (question) {
        var _this = this;
        if (confirm("Do you really want to delete this question?")) {
            var url = this.baseUrl + "api/question/" + question.Id;
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Question " + question.Id + " has been deleted.");
                // refresh the question list
                _this.loadData();
            }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], QuestionListComponent.prototype, "quiz", void 0);
    QuestionListComponent = __decorate([
        Component({
            selector: "question-list",
            templateUrl: './question-list.component.html',
            styleUrls: ['./question-list.component.css']
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String, Router])
    ], QuestionListComponent);
    return QuestionListComponent;
}());
export { QuestionListComponent };
//# sourceMappingURL=question-list.component.js.map