const tips = {
  phishing:
    "Urgent language, unknown sender aur suspicious link phishing ke common warning signs hain. Link open karne se pehle domain verify karo.",

  password:
    "Har account ke liye unique long password use karo. MFA enable karo. Real password kisi website par enter mat karo.",

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
      "https://secure-bank-example.test/verify",
      "https://www.example.com/contact"
    ],
    answer: 2,
    explanation: "A strange or unfamiliar domain should be verified before entering information."
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
  },
  {
    question: "Which action is safest when you receive an unexpected payment request?",
    options: [
      "Approve it quickly",
      "Verify through the official app",
      "Share your UPI PIN",
      "Call the number shown in the message"
    ],
    answer: 1,
    explanation: "Verify unexpected requests through the official app or a trusted contact method."
  },
  {
    question: "What should you do with a suspicious email attachment?",
    options: [
      "Open it to check",
      "Download it on your phone",
      "Do not open it and report/delete the message",
      "Forward it to everyone"
    ],
    answer: 2,
    explanation: "Suspicious attachments may contain malware. Do not open or forward them."
  },
  {
    question: "What does MFA provide?",
    options: [
      "An extra layer of account protection",
      "Free internet",
      "A faster processor",
      "A public password"
    ],
    answer: 0,
    explanation: "Multi-factor authentication adds another verification step to protect an account."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let studentName = "";
let quizStartTime = 0;

const studentBox = document.getElementById("student-box");
const studentNameInput = document.getElementById("student-name");
const startQuizButton = document.getElementById("start-quiz-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const scoreFill = document.getElementById("score-fill");
const restartButton = document.getElementById("restart-btn");

const resultName = document.getElementById("result-name");
const resultCorrect = document.getElementById("result-correct");
const resultWrong = document.getElementById("result-wrong");
const resultPercentage = document.getElementById("result-percentage");
const resultTime = document.getElementById("result-time");

startQuizButton.addEventListener("click", startQuiz);

studentNameInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    startQuiz();
  }
});

function startQuiz() {
  const name = studentNameInput.value.trim();

  if (name.length < 2) {
    alert("Please apna naam enter karo.");
    studentNameInput.focus();
    return;
  }

  studentName = name;
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizStartTime = performance.now();

  studentBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  loadQuestion();
}

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

    button.addEventListener("click", function() {
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

  allOptions.forEach(function(button, index) {
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

nextButton.addEventListener("click", function() {
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
  const endTime = performance.now();
  const percentage = Math.round((score / questions.length) * 100);
  const wrongAnswers = questions.length - score;
  const timeTaken = Math.max(
    1,
    Math.round((endTime - quizStartTime) / 1000)
  );

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const formattedTime = `${minutes} min ${seconds} sec`;

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  resultName.textContent = studentName;
  resultCorrect.textContent = `${score} / ${questions.length}`;
  resultWrong.textContent = wrongAnswers;
  resultPercentage.textContent = `${percentage}%`;
  resultTime.textContent = formattedTime;

  if (percentage === 100) {
    resultTitle.textContent = "Perfect Cyber Champion!";
  } else if (percentage >= 80) {
    resultTitle.textContent = "Cyber Champion";
  } else if (percentage >= 50) {
    resultTitle.textContent = "Cyber Aware";
  } else {
    resultTitle.textContent = "Keep Learning";
  }

  resultText.textContent =
    `${studentName}, tumne ${score} correct answers diye. ` +
    "Learning modules complete karke quiz dobara try karo.";

  scoreFill.style.width = `${percentage}%`;

  const resultData = {
    name: studentName,
    correct: score,
    wrong: wrongAnswers,
    total: questions.length,
    percentage: percentage,
    timeSeconds: timeTaken,
    timeText: formattedTime,
    date: new Date().toLocaleString()
  };

  saveResult(resultData);
  renderResults();
}

restartButton.addEventListener("click", function() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  quizBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  studentBox.classList.remove("hidden");

  studentNameInput.value = "";
  scoreFill.style.width = "0%";

  window.location.hash = "quiz";
});

function getResults() {
  try {
    return JSON.parse(localStorage.getItem("cyberQuizResults")) || [];
  } catch (error) {
    return [];
  }
}

function saveResult(resultData) {
  const results = getResults();

  results.push(resultData);

  results.sort(function(a, b) {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }

    if (a.timeSeconds !== b.timeSeconds) {
      return a.timeSeconds - b.timeSeconds;
    }

    return new Date(a.date) - new Date(b.date);
  });

  localStorage.setItem("cyberQuizResults", JSON.stringify(results));
}

function renderResults() {
  const resultsBody = document.getElementById("results-body");
  const results = getResults();

  if (results.length === 0) {
    resultsBody.innerHTML = `
      <tr>
        <td colspan="7">Abhi koi result available nahi hai.</td>
      </tr>
    `;
    return;
  }

  resultsBody.innerHTML = results.map(function(result, index) {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHTML(result.name)}</td>
        <td>${result.correct}/${result.total}</td>
        <td>${result.wrong}</td>
        <td>${result.percentage}%</td>
        <td>${result.timeText}</td>
        <td>${escapeHTML(result.date)}</td>
      </tr>
    `;
  }).join("");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function downloadResults() {
  const results = getResults();

  if (results.length === 0) {
    alert("Download karne ke liye koi result nahi hai.");
    return;
  }

  const headers = [
    "Rank",
    "Name",
    "Correct",
    "Wrong",
    "Total",
    "Percentage",
    "Time",
    "Date"
  ];

  const rows = results.map(function(result, index) {
    return [
      index + 1,
      result.name,
      result.correct,
      result.wrong,
      result.total,
      `${result.percentage}%`,
      result.timeText,
      result.date
    ];
  });

  const csv = [headers, ...rows]
    .map(function(row) {
      return row.map(function(value) {
        return `"${String(value).replaceAll('"', '""')}"`;
      }).join(",");
    })
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "cybersaathi-results.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function clearResults() {
  const results = getResults();

  if (results.length === 0) {
    alert("Clear karne ke liye koi result nahi hai.");
    return;
  }

  const confirmed = confirm(
    "Kya tum sabhi quiz results delete karna chahte ho?"
  );

  if (confirmed) {
    localStorage.removeItem("cyberQuizResults");
    renderResults();
  }
}

const scenarios = [
  {
    sender: "support@secure-bank-example.test",
    message:
      "Your account will be blocked in 10 minutes. Verify your details immediately: https://secure-bank-example.test/verify",
    answer: "suspicious",
    reason:
      "It creates urgency, uses an unfamiliar domain and asks you to verify account details through a link."
  },
  {
    sender: "offers@prize-example.test",
    message:
      "Congratulations! You won ₹50,000. Pay a small processing fee now to receive your prize.",
    answer: "suspicious",
    reason:
      "Unexpected prize claims and requests for payment are common scam warning signs."
  },
  {
    sender: "college-office@example.edu",
    message:
      "Your timetable is available on the official college portal. Open the portal by typing its known address yourself.",
    answer: "safe",
    reason:
      "This example does not ask for an OTP, password or payment and tells you to use the known official portal."
  },
  {
    sender: "delivery-update@parcel-example.test",
    message:
      "Your parcel could not be delivered. Pay ₹25 through this shortened link to reschedule delivery.",
    answer: "suspicious",
    reason:
      "A payment request through an unexpected shortened link should be independently verified."
  },
  {
    sender: "unknown-number",
    message:
      "Send your UPI PIN to receive cashback. Offer expires in 5 minutes.",
    answer: "suspicious",
    reason:
      "UPI PIN is never required to receive money. Urgency and a request for sensitive information are red flags."
  }
];

let currentScenario = 0;

function loadScenario() {
  const scenario = scenarios[currentScenario];

  document.getElementById("scenario-number").textContent =
    `Sample Scenario ${currentScenario + 1} of ${scenarios.length}`;

  document.getElementById("message-sender").textContent = scenario.sender;
  document.getElementById("message-content").textContent = scenario.message;

  const result = document.getElementById("simulator-result");

  result.textContent = "Choose an answer to see the explanation.";
  result.className = "simulator-result";
}

function checkPhishing(choice) {
  const scenario = scenarios[currentScenario];
  const result = document.getElementById("simulator-result");

  if (choice === scenario.answer) {
    result.innerHTML = `
      <strong>Correct!</strong><br><br>
      ${scenario.reason}
    `;

    result.className = "simulator-result correct-result";
  } else {
    result.innerHTML = `
      <strong>Not quite.</strong><br><br>
      ${scenario.reason}
    `;

    result.className = "simulator-result wrong-result";
  }
}

function nextScenario() {
  currentScenario = (currentScenario + 1) % scenarios.length;
  loadScenario();
}

function resetSimulator() {
  loadScenario();
}

function checkPassword() {
  const password = document.getElementById("password-input").value;
  const result = document.getElementById("password-result");
  const fill = document.getElementById("password-fill");

  let strength = 0;

  if (password.length >= 12) {
    strength++;
  }

  if (/[A-Z]/.test(password)) {
    strength++;
  }

  if (/[a-z]/.test(password)) {
    strength++;
  }

  if (/[0-9]/.test(password)) {
    strength++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    strength++;
  }

  const percentage = Math.min(strength * 20, 100);
  fill.style.width = `${percentage}%`;

  if (password.length === 0) {
    result.textContent = "Password strength yahan show hogi.";
    result.style.color = "#334155";
    fill.style.background = "#cbd5e1";
    return;
  }

  if (strength <= 2) {
    result.textContent = "Weak password. Isse stronger banao.";
    result.style.color = "#dc2626";
    fill.style.background = "#dc2626";
  } else if (strength <= 4) {
    result.textContent = "Medium password. Kuch improvements required hain.";
    result.style.color = "#d97706";
    fill.style.background = "#f59e0b";
  } else {
    result.textContent = "Strong pattern. Isse kisi ke saath share mat karo.";
    result.style.color = "#16a34a";
    fill.style.background = "#16a34a";
  }
}

renderResults();
loadScenario();
