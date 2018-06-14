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
import { FormBuilder } from '@angular/forms';
var QuestionEditComponent = /** @class */ (function () {
    function QuestionEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.question = {};
        // initialize the form
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the quiz from the server
            var url = this.baseUrl + "api/question/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.question = res;
                _this.title = "Edit - " + _this.question.Text;
                _this.updateForm();
            }, function (error) { return console.error(error); });
        }
        else {
            this.question.QuizId = id;
            this.title = "Create a new Question";
        }
    }
    QuestionEditComponent.prototype.createForm = function () {
        var _this = this;
        this.form = this.fb.group({
            Text: ''
        });
        this.activityLog = '';
        this.log("Form has been initialized.");
        // react to form changes
        this.form.valueChanges
            .subscribe(function (val) {
            if (!_this.form.dirty) {
                _this.log("Form Model has been loaded.");
            }
            else {
                _this.log("Form was updated by the user.");
            }
        });
        // react to changes in the form.Text control
        this.form.get("Text").valueChanges
            .subscribe(function (val) {
            if (!_this.form.dirty) {
                _this.log("Text control has been loaded with initial values.");
            }
            else {
                _this.log("Text control was updated by the user.");
            }
        });
    };
    QuestionEditComponent.prototype.log = function (str) {
        this.activityLog += "["
            + new Date().toLocaleString()
            + "] " + str + "<br />";
        //& gt;
    };
    QuestionEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Text: this.question.Text || ''
        });
    };
    // retrieve a FormControl
    QuestionEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    // returns TRUE if the FormControl is valid
    QuestionEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    // returns TRUE if the FormControl has been changed
    QuestionEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    // returns TRUE if the FormControl is invalid after user changes
    QuestionEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    //question: Question
    QuestionEditComponent.prototype.onSubmit = function () {
        var _this = this;
        // build a temporary quiz object from form values
        var tempQuestion = {};
        tempQuestion.Text = this.form.value.Text;
        tempQuestion.QuizId = this.question.QuizId;
        var url = this.baseUrl + "api/question";
        if (this.editMode) {
            tempQuestion.Id = this.question.Id;
            this.http
                .post(url, tempQuestion)
                .subscribe(function (res) {
                var v = res;
                console.log("Question " + v.Id + " has been  updated.");
                _this.router.navigate(["quiz/edit", v.QuizId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempQuestion)
                .subscribe(function (res) {
                var v = res;
                console.log("Question " + v.Id + " has been  created.");
                _this.router.navigate(["quiz/edit", v.QuizId]);
            }, function (error) { return console.log(error); });
        }
    };
    QuestionEditComponent.prototype.onBack = function () {
        this.router.navigate(["quiz/edit", this.question.QuizId]);
    };
    QuestionEditComponent = __decorate([
        Component({
            selector: "question-edit",
            templateUrl: './question-edit.component.html',
            styleUrls: ['./question-edit.component.css']
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            HttpClient,
            FormBuilder, String])
    ], QuestionEditComponent);
    return QuestionEditComponent;
}());
export { QuestionEditComponent };
//# sourceMappingURL=question-edit.component.js.map