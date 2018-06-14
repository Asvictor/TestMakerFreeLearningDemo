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
var AnswerListComponent = /** @class */ (function () {
    function AnswerListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.answers = [];
    }
    AnswerListComponent.prototype.ngOnChanges = function (changes) {
        if (typeof changes['question'] !== "undefined") {
            // retrieve the question variable change info
            var change = changes['question'];
            // only perform the task if the value has been changed
            if (!change.isFirstChange()) {
                // execute the Http request and retrieve the result
                this.loadData();
            }
        }
    };
    AnswerListComponent.prototype.loadData = function () {
        var _this = this;
        var url = this.baseUrl + "api/answer/All/" + this.question.Id;
        this.http.get(url).subscribe(function (res) {
            _this.answers = res;
        }, function (error) { return console.error(error); });
    };
    AnswerListComponent.prototype.onCreate = function () {
        this.router.navigate(["/answer/create", this.question.Id]);
    };
    AnswerListComponent.prototype.onEdit = function (answer) {
        this.router.navigate(["/answer/edit", answer.Id]);
    };
    AnswerListComponent.prototype.onDelete = function (answer) {
        var _this = this;
        if (confirm("Do you really want to delete this answer?")) {
            var url = this.baseUrl + "api/answer/" + answer.Id;
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Answer " + answer.Id + " has been  deleted.");
                // refresh the question list
                _this.loadData();
            }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AnswerListComponent.prototype, "question", void 0);
    AnswerListComponent = __decorate([
        Component({
            selector: "answer-list",
            templateUrl: './answer-list.component.html',
            styleUrls: ['./answer-list.component.css']
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String, Router])
    ], AnswerListComponent);
    return AnswerListComponent;
}());
export { AnswerListComponent };
//# sourceMappingURL=answer-list.component.js.map