

const tips = {
  phishing:
    "Urgent language, unknown sender aur suspicious link phishing ke common warning signs hain. Link open karne se pehle domain verify karo.",

  password:
    "Har account ke liye unique password use karo. Long password rakho aur MFA enable karo. Real password kisi website par enter mat karo.",

  otp:
    "Bank, UPI app ya support staff kabhi OTP, PIN ya CVV nahi maangte. Aisi information kisi ke saath share mat karo.",

  browsing:
    "Website ka spelling aur domain check karo. Unknown files download mat karo aur browser/software updated rakho.",

  social:
    "Public profile par phone number, address, school details aur private documents share mat karo. Privacy settings regularly check karo."
};

function showTip(topic) {
  document.getElementById("tip-box").textContent = tips[topic];
}

const questions = [
  {
    question: "A message says: 'Your account will be blocked in 10 minutes. Click this link now.' What should you do?",
    options: [
      "Immediately click the link",
      "Forward it to friends",
      "Verify through the official app or website",
      "Reply with your OTP"
    ],
    answer: 2,
    explanation: "Urgency plus an unknown link is a common phishing warning sign."
  },
  {
    question: "Which information should never be shared with anyone?",
    options: [
      "Your favourite colour",
      "OTP, PIN and CVV",
      "A public course name",
      "Your city name"
    ],
    answer: 1,
    explanation: "Never share OTP, PIN or CVV, even if someone claims to be from a bank."
  },
  {
    question: "What is the safest password habit?",
    options: [
      "Use the same password everywhere",
      "Use your birth date",
      "Use a unique long password for every account",
      "Share it with a trusted friend"
    ],
    answer: 2,
    explanation: "Unique and long passwords reduce the impact of an account breach."
  },
  {
    question: "Which URL looks most suspicious?",
    options: [
      "https://www.example.com",
      "https://www.example.com/login",
      "https://example-security.test",
      "https://www.example.com/contact"
    ],
    answer: 2,
    explanation: "A strange or unfamiliar domain should be verified before you enter any information."
  },
  {
    question: "You clicked a suspicious link. What should you do first?",
    options: [
      "Ignore everything",
      "Share your OTP to fix it",
      "Close it, change affected passwords and contact the official service",
      "Forward the link to others"
    ],
    answer: 2,
    explanation: "Secure the account quickly and contact the official service through a verified channel."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
  answered = false;
  feedback.textContent = "";
  nextButton.disabled = true;

  const item = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = item.question;
  optionsBox.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(button, index);
    });

    optionsBox.appendChild(button);
  });
}

function selectAnswer(selectedButton, selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;
  nextButton.disabled = false;

  const item = questions[currentQuestion];
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach((button, index) => {
    button.disabled = true;

    if (index === item.answer) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === item.answer) {
    score++;
    feedback.textContent = `Correct! ${item.explanation}`;
    feedback.style.color = "#16a34a";
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Not quite. ${item.explanation}`;
    feedback.style.color = "#dc2626";
  }
}

nextButton.addEventListener("click", () => {
  if (!answered) {
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);

  if (percentage >= 80) {
    resultTitle.textContent = "🏆 Cyber Champion";
  } else if (percentage >= 50) {
    resultTitle.textContent = "👍 Cyber Aware";
  } else {
    resultTitle.textContent = "📚 Keep Learning";
  }

  resultText.textContent =
    `Your score is ${score}/${questions.length} (${percentage}%). ` +
    "Complete the learning modules and try again.";

  localStorage.setItem("cyberScore", percentage);
}

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
});

loadQuestion();