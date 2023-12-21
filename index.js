const questions = [
    {
        question: "What is the recommended daily water intake for an average adult?",
        choices: ["5 liters", "2 liters", "8 liters"],
        answer: 1
    },
    {
        question: "Which nutrient is the body's primary source of energy?",
        choices: ["Protein", "Fat", "Carbohydrate"],
        answer: 2
    },
    {
        question: "What is the average resting heart rate for adults?",
        choices: ["50-60 beats per minute", "70-80 beats per minute", "90-100 beats per minute"],
        answer: 1
    },
    {
        question: "What does BMI stand for?",
        choices: ["Body Mass Index", "Basic Metabolic Index", "Body Measurement Indicator"],
        answer: 0
    },
    {
        question: "Which vitamin is synthesized by the human body when exposed to sunlight?",
        choices: ["Vitamin A", "Vitamin C", "Vitamin D"],
        answer: 2
    },
    {
        question: "What is the minimum recommended hours of sleep per night for adults?",
        choices: ["4 hours", "6 hours", "8 hours"],
        answer: 2
    },
    {
        question: "Which exercise is known for its cardiovascular benefits?",
        choices: ["Weightlifting", "Yoga", "Running"],
        answer: 2
    },
    {
        question: "What is the main function of red blood cells in the body?",
        choices: ["Oxygen transport", "Hormone production", "Digestion"],
        answer: 0
    },
    {
        question: "Which food group is a good source of calcium?",
        choices: ["Meat", "Dairy", "Grains"],
        answer: 1
    },
    {
        question: "What is the average body temperature in degrees Celsius?",
        choices: ["36.5°C", "38.0°C", "40.0°C"],
        answer: 0
    }

];

let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;
let time = 15 * 60;
let timer;
const countdown = document.getElementById('time');

function displayQuestion() {
    const questionElement = document.querySelector('.question');
    const choicesElement = document.querySelector('.choices');
    const currentQ = questions[currentQuestion];

    questionElement.textContent = currentQ.question;
    choicesElement.innerHTML = '';

    currentQ.choices.forEach((choice, index) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'choice';
        radio.value = index;

        const textNode = document.createTextNode(choice);

        label.appendChild(radio);
        label.appendChild(textNode);
        choicesElement.appendChild(label);
    });
}

function checkAnswer() {
    const userAnswer = document.querySelector('input[name="choice"]:checked');
    if (userAnswer) {
        const selectedAnswer = parseInt(userAnswer.value);
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedAnswer === correctAnswer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert('Please select an answer.');
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        countdown.textContent = formatTime(time);

        if (time <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${totalQuestions}</p>
    `;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
    startTimer();
    displayQuestion();
});

document.getElementById('submit-btn').addEventListener('click', checkAnswer);
