import { Component, Inject, Input, OnInit } from "@angular/core";  //import existing function from packages
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

/**
 * The selector, which gives a name to the HTML pseudo-element
 * we'll have to use to include the component within another
 * component's template; in this case, with the given value, it will be
 * <quiz-list></quiz-list>
 */
@Component({
    selector: "quiz-list",            
    templateUrl: './quiz-list.component.html',  // its corresponding view
    styleUrls: ['./quiz-list.component.css']    /* its corresonding style sheet,the expected value is an array, meaning that we
                                                   can split the component styling into multiple CSS files*/
})

//class implementation
export class QuizListComponent implements OnInit {
    @Input() class: string;         //the @Input means that the property is coming from data binding
    title: string;                  //properties
    selectedQuiz: Quiz;
    quizzes: Quiz[]; 

    //use syntactic sugar to create properties
    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
        private router: Router) { 
    }

    ngOnInit() {
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
        this.http.get<Quiz[]>(url).subscribe(result => {
            this.quizzes = result;
        }, error => console.error(error));
    }

    onSelect(quiz: Quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id "
            + this.selectedQuiz.Id
            + " has been selected.");
        this.router.navigate(["quiz", this.selectedQuiz.Id]);
    } 
 
}