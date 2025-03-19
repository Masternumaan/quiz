const questions =[
    {
        question:"Addition of 2 + 5 ?",
        answers:[
            {text:"2",correct:false},
            {text:"7",correct:true},
            {text:"4",correct:false},
            {text:"8",correct:false},
        ]
    },
    {
        question:"Addition of 8 + 5 ?",
        answers:[
            {text:"22",correct:false},
            {text:"74",correct:false},
            {text:"13",correct:true},
            {text:"11",correct:false},
        ]
    },
    {
        question:" 2 + 5 - 6 + 2 ?",
        answers:[
            {text:"3",correct:true},
            {text:"7",correct:false},
            {text:"5",correct:false},
            {text:"10",correct:false},
        ]
    },
    {
        question:"Multiplication of 3 * 7 ?",
        answers:[
            {text:"14",correct:false},
            {text:"22",correct:false},
            {text:"12",correct:false},
            {text:"21",correct:true},
        ]
    },
];
const questionEle=document.getElementById("question");
const answersBtn=document.getElementById("answer-button");
const nextBtn=document.getElementById("next-btn");

let currentQuestionIndex =0;
let score=0;

startQuiz=()=>{
    currentQuestionIndex =0;
    score=0;
    nextBtn.innerHTML="NEXT";
    showQuation();
}
showQuation=()=>{
    resetstate();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionEle.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answers=>{
        const button =document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

resetstate=()=>{
    nextBtn.style.display="none";
    while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

selectAnswer=(e)=>{
    const selectbtn=e.target;
    const isCorrect=selectbtn.dataset.correct==="true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");

    }
    Array.from(answersBtn.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextBtn.style.display="block";
}

showScore=()=>{
    resetstate();
    questionEle.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block"
}

handleNextBtn=()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuation();
    }else{
        showScore();
    }
}
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();