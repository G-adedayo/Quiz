const questions = [
    // Define an array of at least 20 questions for randomness
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What color is the sky?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Blue" },
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: "Paris" },
    { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "Who wrote 'To be or not to be'?", options: ["Hemingway", "Shakespeare", "Dickens", "Austen"], answer: "Shakespeare" },
    { question: "What is the boiling point of water?", options: ["50°C", "100°C", "150°C", "200°C"], answer: "100°C" },
    { question: "What is 5 * 6?", options: ["28", "30", "32", "35"], answer: "30" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "300,000 km/s" },
    { question: "What is the primary language of Brazil?", options: ["English", "Spanish", "Portuguese", "French"], answer: "Portuguese" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Who wrote the play 'Romeo and Juliet?'", options: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"], answer: "William Shakespeare" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Hydrogen", "Osmium"], answer: "Oxygen" },
    { question: "Which ocean is the largest by area?", options: ["Indian", "Atlantic", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
    { question: "In what year did the Titanic sink?", options: ["1912", "1920", "1905", "1930"], answer: "1912" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "South Korea", "Thailand"], answer: "Japan" },
    { question: "Who is the author of the Harry Potter series?", options: ["J.R.R. Tolkien", "J.K. Rowling", "Stephen King", "George Orwell"], answer: "J.K. Rowling" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Which animal is known as the King of the Jungle?", options: ["Lion", "Tiger", "Elephant", "Bear"], answer: "Lion" },
    { question: "What is the capital city of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], answer: "Canberra" },
    // Add more questions as needed
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let displayedQuestions = [];
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultPopup = document.getElementById("resultPopup");
  
  function startQuiz() {
    displayedQuestions = [];
    while (displayedQuestions.length < 10) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!displayedQuestions.includes(questions[randomIndex])) {
        displayedQuestions.push(questions[randomIndex]);
      }
    }
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
  }
  
  function loadQuestion() {
    const { question, options } = displayedQuestions[currentQuestionIndex];
    questionEl.textContent = question;
    optionsEl.innerHTML = "";
    options.forEach(option => {
      const optionBtn = document.createElement("div");
      optionBtn.className = "option";
      optionBtn.textContent = option;
      optionBtn.addEventListener("click", () => checkAnswer(option));
      optionsEl.appendChild(optionBtn);
    });
  }
  
  function checkAnswer(selectedOption) {
    const correctAnswer = displayedQuestions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      score++;
      showPopup("Correct!", "#28a745");
    } else {
      showPopup("Incorrect!", "#dc3545");
    }
    setTimeout(nextQuestion, 1000);
  }
  
  function skipQuestion() {
    showPopup("Skipped!", "#ffc107");
    setTimeout(nextQuestion, 1000);
  }
  
  function showPopup(message, color) {
    resultPopup.style.display = "block";
    resultPopup.style.backgroundColor = color;
    resultPopup.textContent = message;
    setTimeout(() => {
      resultPopup.style.display = "none";
    }, 1000);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < displayedQuestions.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }
  
  function showFinalScore() {
    const percentage = (score / displayedQuestions.length) * 100;
    const message =
      score >= 5
        ? `Congratulations! You scored ${score}/10 (${percentage}%)`
        : `Try harder! You scored ${score}/10 (${percentage}%)`;
    showPopup(message, score >= 5 ? "#28a745" : "#dc3545");
  
    setTimeout(() => {
      const tryAgain = confirm(`${message}\nWould you like to try again?`);
      if (tryAgain) {
        startQuiz();
      } else {
        alert("Thank you for participating in our Quiz!");
        window.location.href = "thank_you.html"; // Redirect to thank you page
      }
    }, 1500);
  }
  
  startQuiz();
  