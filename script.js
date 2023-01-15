async function getCompletion() {
  try {
    const configuration = new Configuration({
      // apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    // const completionFunction = async () => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Maak woordenschatvragen per alinea over het volgende onderwerp voor leerlingen van het 4e leerjaar met synonieme antwoorden als meerkeuzevragen met het juiste antwoord:\n\nNa het doorzoeken van honderden sollicitaties heeft Geronimo eindelijk de perfecte assistent gevonden. Pinky Punk is jong, hip en een kei met computers. Maar Geronimo let niet op en heeft het contract al getekend als hij erachter komt dat ze niet alleen veel te jong is, maar ook nog eens heel brutaal. Ze organiseert een nieuwjaarsfeest op de Noordpool, waar ze de hele Stilton-familie naartoe sleept. Geronimo houdt niet van Pinky's wilde levensstijl, luide muziek en nieuwe snufjes. Maar Pinky zit ook vol goede ideeën en krijgt sensationele dingen voor elkaar. Het leven van Geronimo zal nooit meer hetzelfde zijn.\n\n1. Wat is Pinky's leeftijd? \nA. Jong \nB. Oud \nC. Middelbaar \nD. Volwassen \nAntwoord: A. Jong\n\n2. Wat voor soort persoon is Pinky?\nA. Rustig \nB. Luidruchtig \nC. Creatief \nD. Gemiddeld \nAntwoord: C. Creatief\n\n3. Wat organiseert Pinky?\nA. Een kerstfeest \nB. Een nieuwjaarsfeest \nC. Een verjaardagsfeest \nD. Een bruiloftsfeest \nAntwoord: B. Een nieuwjaarsfeest\n\n4. Waar organiseert Pinky haar nieuwjaarsfeest? \nA. Op het strand \nB. In de bergen \nC. In de woestijn \nD. Op de Noordpool \nAntwoord: D. Op de Noordpool\n\n5. Wat vindt Geronimo niet",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.data.choices[0].text);
    // };

    return response;
  } catch (err) {
  }
}

// getCompletion();


/* maak een api die kinderboeken genereert */
// var api = {
//   getBook: function(title, author, year) {
//     return {
//       title: title,
//       author: author,
//       year: year
//     };
//   }
// };



(function () {
  const myQuestions = [
    {
      question: "Wat is Pinky's leeftijd?",
      answers: {
        a: "Jong",
        b: "Oud",
        c: "Middelbaar"
      },
      correctAnswer: "a"

    },
    {
      question: "Wat voor soort persoon is Pinky?",
      answers: {
        a: "Rustig",
        b: "Luidruchtig",
        c: "Creatief"
      },
      correctAnswer: "c"
    },
    {
      question: "Wat organiseert Pinky?",
      answers: {
        a: " Een kerstfeest ",
        b: "Een nieuwjaarsfeest ",
        c: "Een verjaardagsfeest ",

      },
      correctAnswer: "b"
    },
    {
      question: "Waar organiseert Pinky haar nieuwjaarsfeest?",
      answers: {
        a: "Op het strand",
        b: " In de bergen ",
        c: " In de woestijn",

      },
      correctAnswer: "c"
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz-q");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  // submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

