const questions = [
    {
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Islamabad", "Lahore", "Quetta"],
        correct: "Islamabad"
    },
    {
        question: "Which is the smallest continent?",
        options: ["Asia", "Australia", "Europe", "Antarctica"],
        correct: "Australia"
    },
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "What color is the sky?",
        options: ["Blue", "Red", "Green", "Black"],
        correct: "Blue"
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Transfer Markup Language", "Hyper Text Makeup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: "Hyper Text Markup Language"
    }
];
let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("questionNumber").innerText = `(${currentQuestion + 1}/${questions.length})`;

    let optionsHTML = '<div class="row">';
    q.options.forEach((option, index) => {
        optionsHTML += `
            <div class="col-md-6 col-12 mb-2">
                <button class="btn btn-outline-dark w-100 text-start option" onclick="selectOption(this)">
                    ${option}
                </button>
            </div>
        `;
    });
optionsHTML += '</div>';
    document.getElementById("quizBox").innerHTML = `
        <h4>${q.question}</h4>
        ${optionsHTML}
        <button class="next-btn" onclick="nextQuestion()">Next</button>
    `;
}

function selectOption(el) {
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    el.classList.add("selected");
}

function nextQuestion() {
    const selected = document.querySelector(".option.selected");
    if (!selected) {
        alert("Please select an option.");
        return;
    }

    const answer = selected.innerText;
    const correct = questions[currentQuestion].correct;

    if (answer === correct) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("wrong");
        // highlight correct one
        document.querySelectorAll(".option").forEach(opt => {
            if (opt.innerText === correct) {
                opt.classList.add("correct");
            }
        });
    }

    // Disable further clicks
    document.querySelectorAll(".option").forEach(opt => {
        opt.onclick = null;
    });

    // Delay before showing next
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const colorClass = percentage >= 50 ? "text-success" : "text-danger";

    document.getElementById("quizBox").innerHTML = `
        <h3>Quiz Completed!</h3>
        <p>Your Score: <strong class="${colorClass}">${percentage}%</strong></p>
    `;
    document.getElementById("questionNumber").style.display = "none";
}
// Start quiz
showQuestion();