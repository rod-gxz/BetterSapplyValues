// Perguntas de exemplo (adicione as suas)
const questions = [
  { question: "The government should regulate the economy.", effects: { econ: -5 } },
  { question: "Individual freedom should be prioritized over social order.", effects: { auth: -5 } },
  { question: "Tradition should be preserved even if it limits progress.", effects: { prog: -5 } },
  { question: "The state should redistribute wealth.", effects: { econ: -5 } }
];

// Respostas de 7 níveis
const responses = [
  { text: "Strongly Agree", value: 10 },
  { text: "Agree", value: 7 },
  { text: "Partly Agree", value: 4 },
  { text: "Neutral / Unsure", value: 0 },
  { text: "Partly Disagree", value: -4 },
  { text: "Disagree", value: -7 },
  { text: "Strongly Disagree", value: -10 }
];

let current = 0;
let results = { econ: 0, auth: 0, prog: 0 };
let quizQuestions = [];

// Escolha shuffled/unshuffled
function setShuffle(isShuffled) {
  document.getElementById("instructions-box").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";

  quizQuestions = [...questions];
  if (isShuffled) quizQuestions = shuffleArray(quizQuestions);

  current = 0;
  results = { econ: 0, auth: 0, prog: 0 };
  showQuestion();
}

// Função para embaralhar
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({value}) => value);
}

// Mostrar pergunta atual
function showQuestion() {
  if (current >= quizQuestions.length) return showResults();

  const q = quizQuestions[current];
  document.getElementById("progress").innerText = `Question ${current+1} of ${quizQuestions.length}`;
  document.getElementById("question-text").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  responses.forEach((resp, index) => {
    const btn = document.createElement("button");
    btn.innerText = resp.text;
    btn.className = "btn-response btn-" + index;
    btn.onclick = () => answer(resp.value);
    answersDiv.appendChild(btn);
  });
}

// Registrar resposta
function answer(value) {
  const q = quizQuestions[current];
  for (let key in q.effects) {
    results[key] += value;
  }
  current++;
  showQuestion();
}

// Mostrar resultados
function showResults() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";

  const ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Econ', 'Auth', 'Prog'],
      datasets: [{
        label: 'Your Scores',
        data: [results.econ, results.auth, results.prog],
        backgroundColor: 'rgba(0,119,204,0.2)',
        borderColor: '#0077cc',
        pointBackgroundColor: '#0077cc'
      }]
    },
    options: { scales: { r: { min: -10, max: 10 } } }
  });

  document.getElementById("result-text").innerText =
    `Econ: ${results.econ}, Auth: ${results.auth}, Prog: ${results.prog}`;
}

// Refazer quiz
function restartQuiz() {
  document.getElementById("result-box").style.display = "none";
  document.getElementById("instructions-box").style.display = "block";
}
