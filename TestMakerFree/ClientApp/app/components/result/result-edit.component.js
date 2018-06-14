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
var ResultEditComponent = /** @class */ (function () {
    function ResultEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.result = {};
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the quiz from the server
            var url = this.baseUrl + "api/result/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.result = res;
                _this.title = "Edit - " + _this.result.Text;
                // update the form with the quiz value
                _this.updateForm();
            }, function (error) { return console.error(error); });
        }
        else {
            this.result.QuizId = id;
            this.title = "Create a new Result";
        }
    }
    ResultEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Text: ['', Validators.required],
            MinValue: ['', Validators.pattern(/^\d*$/)],
            MaxValue: ['', Validators.pattern(/^\d*$/)]
        });
    };
    ResultEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Text: this.result.Text || '',
            MinValue: this.form.value.MinValue || '',
            MaxValue: this.form.value.MaxValue || ''
        });
    };
    // retrieve a FormControl
    ResultEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    // returns TRUE if the FormControl is valid
    ResultEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    // returns TRUE if the FormControl has been changed
    ResultEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    // returns TRUE if the FormControl is invalid after user changes
    ResultEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    /**
     *     Id: number;
    QuizId: number;
    Text: string;
    MinValue?: number;
    MaxValue?: number;
     */
    //result: Result
    ResultEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var tempResult = {};
        tempResult.QuizId = this.result.QuizId;
        tempResult.Text = this.form.value.text;
        tempResult.MaxValue = this.form.value.MaxValue;
        tempResult.MinValue = this.form.value.MinValue;
        var url = this.baseUrl + "api/result";
        if (this.editMode) {
            tempResult.Id = this.result.Id;
            this.http
                .post(url, tempResult)
                .subscribe(function (res) {
                var v = res;
                console.log("Result " + v.Id + " has been  updated.");
                _this.router.navigate(["quiz/edit", v.QuizId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempResult)
                .subscribe(function (res) {
                var v = res;
                console.log("Result " + v.Id + " has been  created.");
                _this.router.navigate(["quiz/edit", v.QuizId]);
            }, function (error) { return console.log(error); });
        }
    };
    ResultEditComponent.prototype.onBack = function () {
        this.router.navigate(["quiz/edit", this.result.QuizId]);
    };
    ResultEditComponent = __decorate([
        Component({
            selector: "result-edit",
            templateUrl: './result-edit.component.html',
            styleUrls: ['./result-edit.component.css']
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            HttpClient,
            FormBuilder, String])
    ], ResultEditComponent);
    return ResultEditComponent;
}());
export { ResultEditComponent };
//# sourceMappingURL=result-edit.component.js.map