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
var QuizEditComponent = /** @class */ (function () {
    function QuizEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.quiz = {};
        // initialize the form
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.editMode = true;
            // fetch the quiz from the server
            var url = this.baseUrl + "api/quiz/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.quiz = res;
                _this.title = "Edit - " + _this.quiz.Title;
                // update the form with the quiz value
                _this.updateForm();
            }, function (error) { return console.error(error); });
        }
        else {
            this.editMode = false;
            this.title = "Create a new Quiz";
        }
    }
    QuizEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Title: ['', Validators.required],
            Description: '',
            Text: ''
        });
    };
    QuizEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Title: this.quiz.Title,
            Description: this.quiz.Description || '',
            Text: this.quiz.Text || ''
        });
    };
    // retrieve a FormControl
    QuizEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    // returns TRUE if the FormControl is valid
    QuizEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    // returns TRUE if the FormControl has been changed
    QuizEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    // returns TRUE if the FormControl is invalid after user changes
    QuizEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    //quiz: Quiz
    QuizEditComponent.prototype.onSubmit = function () {
        var _this = this;
        // build a temporary quiz object from form values
        var tempQuiz = {};
        tempQuiz.Title = this.form.value.Title;
        tempQuiz.Description = this.form.value.Description;
        tempQuiz.Text = this.form.value.Text;
        var url = this.baseUrl + "api/quiz";
        if (this.editMode) {
            // don't forget to set the tempQuiz Id,
            // otherwise the EDIT would fail!
            tempQuiz.Id = this.quiz.Id;
            this.http
                .post(url, tempQuiz)
                .subscribe(function (res) {
                var v = res;
                console.log("Quiz " + v.Id + " has been updated.");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempQuiz)
                .subscribe(function (res) {
                var q = res;
                console.log("Quiz " + q.Id + " has been created.");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
    };
    QuizEditComponent.prototype.onBack = function () {
        this.router.navigate(["home"]);
    };
    QuizEditComponent = __decorate([
        Component({
            selector: "quiz-edit",
            templateUrl: './quiz-edit.component.html',
            styleUrls: ['./quiz-edit.component.css']
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            HttpClient,
            FormBuilder, String])
    ], QuizEditComponent);
    return QuizEditComponent;
}());
export { QuizEditComponent };
//# sourceMappingURL=quiz-edit.component.js.map