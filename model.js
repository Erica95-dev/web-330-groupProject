var model = {  // mddel/controller
    questions: myQuestions,  // load data
    index: 0, // start array index at 0
    count: myQuestions.length, // get a count of questions.
    // bind model to view:
    question: ko.observable(myQuestions[0].question),
    answerA: ko.observable(myQuestions[0].answers.a), 
    answerB: ko.observable(myQuestions[0].answers.b),
    answerC: ko.observable(myQuestions[0].answers.c),
    answerD: ko.observable(myQuestions[0].answers.d),  
    answerGiven: 0, // current answer.

    // controller functions:
    next: function () // next question.
    {
        this.questions[this.index].answerGiven=this.answerGiven; // question on view to model.
        document.getElementById("answer_"+this.answerGiven).checked=false; // uncheck radio for answer.
        this.index++; // go to the next questions
        if (this.index>=this.count) // if index > count we have reached the end of the quiz
            {
                $("#submit").show(); // show submit button on view.
                return; 
            }
            $("#previous").show(); // shew previous button on view if not already visible.
        this.showQuestion(); // show next questions on the view.
    },
    prev: function () // goto previous questions.
    {
        this.questions[this.index].answerGiven=''; // reset answer
        this.index--; // decrement index of question.
        if (this.index===0) // if first question hide previous button.
            $("#previous").hide();
        this.showQuestion(); // show question on view.
    },
    showQuestion: function () // show question on view.
    {
        this.question(this.questions[this.index].question);
        this.answerA(this.questions[this.index].answers.a);
        this.answerB(this.questions[this.index].answers.b);
        this.answerC(this.questions[this.index].answers.c);
        this.answerD(this.questions[this.index].answers.d);  
    },
    answerClick: function (val) // answer selected on view.
    {
        this.answerGiven=val;
    },
    gradeQuiz: function () // grade quiz
    {
        var right=0; // number righ starts with 0.
        this.questions.forEach(element => { // loop through each question and answers.
            if (element.answerGiven==element.correctAnswer) // if answer is correct increment right by one.
                right++;
        });

        // construct output:
        var grade =`${right} out of ${this.count} <br/>Your level is `;
        // determine level
        if (right < 6) {
            grade+="Begginner";

        } else if (right > 5 && right < 9) {
            grade+= "Novice"

        } else if (right > 8) {
            grade+= "Expert"
        }
        // display results on view.
        $("#results").html(grade);
        $("#divContent").hide();
    }
}