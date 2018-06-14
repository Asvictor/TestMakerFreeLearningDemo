var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
var QuizSearchComponent = /** @class */ (function () {
    function QuizSearchComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuizSearchComponent.prototype, "class", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuizSearchComponent.prototype, "placeholder", void 0);
    QuizSearchComponent = __decorate([
        Component({
            selector: "quiz-search",
            templateUrl: './quiz-search.component.html',
            styleUrls: ['./quiz-search.component.css']
        })
    ], QuizSearchComponent);
    return QuizSearchComponent;
}());
export { QuizSearchComponent };
//# sourceMappingURL=quiz-search.component.js.map