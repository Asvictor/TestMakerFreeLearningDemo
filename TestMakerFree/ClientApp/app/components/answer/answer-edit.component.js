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
import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
//enable form validation
import { FormBuilder, Validators } from '@angular/forms';
var AnswerEditComponent = /** @class */ (function () {
    function AnswerEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.answer = {};
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the quiz from the server
            var url = this.baseUrl + "api/answer/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.answer = res;
                _this.title = "Edit - " + _this.answer.Text;
                // update the form with the quiz value
                _this.updateForm();
            }, function (error) { return console.error(error); });
        }
        else {
            this.answer.QuestionId = id;
            this.title = "Create a new Question";
        }
    }
    /**
     *     Id: number;
           QuestionId: number;
           Text: string;
           Value: number;
     */
    AnswerEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Text: ['', Validators.required],
            Value: [0,
                [Validators.required,
                    Validators.min(-5),
                    Validators.max(5)]
            ]
        });
    };
    AnswerEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Text: this.answer.Text || '',
            Value: this.form.value.Value || ''
        });
    };
    // retrieve a FormControl
    AnswerEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    // returns TRUE if the FormControl is valid
    AnswerEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    // returns TRUE if the FormControl has been changed
    AnswerEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    // returns TRUE if the FormControl is invalid after user changes
    AnswerEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    //question: Answer
    AnswerEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var tempAnswer = {};
        tempAnswer.QuestionId = this.answer.QuestionId;
        tempAnswer.Text = this.form.value.Text;
        tempAnswer.Value = this.form.value.Value;
        var url = this.baseUrl + "api/answer";
        if (this.editMode) {
            tempAnswer.Id = this.answer.Id;
            this.http
                .post(url, tempAnswer)
                .subscribe(function (res) {
                var v = res;
                console.log("Answer " + v.Id + " has been  updated.");
                _this.router.navigate(["question/edit", v.QuestionId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempAnswer)
                .subscribe(function (res) {
                var v = res;
                console.log("answer " + v.Id + " has been  created.");
                _this.router.navigate(["quiz/edit", v.QuestionId]);
            }, function (error) { return console.log(error); });
        }
    };
    AnswerEditComponent.prototype.onBack = function () {
        this.router.navigate(["question/edit", this.answer.QuestionId]);
    };
    AnswerEditComponent = __decorate([
        Component({
            selector: "answer-edit",
            templateUrl: './answer-edit.component.html',
            styleUrls: ['./answer-edit.component.css']
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            HttpClient,
            FormBuilder, String])
    ], AnswerEditComponent);
    return AnswerEditComponent;
}());
export { AnswerEditComponent };
//# sourceMappingURL=answer-edit.component.js.map