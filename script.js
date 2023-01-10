// $('#quiz').quiz({
//   //resultsScreen: '#results-screen',
//   //counter: false,
//   //homeButton: '#custom-home',
//   counterFormat: 'Question %current of %total',
//   questions: [
//     {
//       'q': 'Is jQuery required for this plugin?',
//       'options': [
//         'Yes',
//         'No'
//       ],
//       'correctIndex': 0,
//       'correctResponse': 'Good job, that was obvious.',
//       'incorrectResponse': 'Well, if you don\'t include it, your quiz won\'t work'
//     },
//     {
//       'q': 'How do you use it?',
//       'options': [
//         'Include jQuery, that\'s it!',
//         'Include jQuery and the plugin javascript.',
//         'Include jQuery, the plugin javascript, the optional plugin css, required markup, and the javascript configuration.'
//       ],
//       'correctIndex': 2,
//       'correctResponse': 'Correct! Sounds more complicated than it really is.',
//       'incorrectResponse': 'Come on, it\'s not that easy!'
//     },
//     {
//       'q': 'The plugin can be configured to require a perfect score.',
//       'options': [
//         'True',
//         'False'
//       ],
//       'correctIndex': 0,
//       'correctResponse': 'You\'re a genius! You just set allowIncorrect to true.',
//       'incorrectResponse': 'Why you have no faith!? Just set allowIncorrect to true.'
//     },
//     {
//       'q': 'How do you specify the questions and answers?',
//       'options': [
//         'MySQL database',
//         'In the HTML',
//         'In the javascript configuration'
//       ],
//       'correctIndex': 2,
//       'correctResponse': 'Correct! Refer to the documentation for the structure.',
//       'incorrectResponse': 'Wrong! Do it in the javascript configuration. You might need to read the documentation.'
//     }
//   ]
// });










(function() {
    const myQuestions = [
      {
        question: "How many fingers are on the foot of a man?",
        answers: {
          a: "one",
          b: "Five",
          c: "Three"
         },
        correctAnswer: "c" 
      
      },
      {
        question: "Whose face was said to have launched 1000 ships?",
        answers: {
          a: "Rowan Atkinson",
          b: "Barbara Mori",
          c: "Helen of Troy"
        },
        correctAnswer: "c"
      },
      {
        question: "Water boils at 212 degrees on which temperature scale?",
        answers: {
          a: "Kelvin",
          b: "Fahrenheit",
          c: "Celsius",
         
        },
        correctAnswer: "b"
      },
      {
        question: "What is the Italian word for pie?",
        answers: {
          a: "Pie",
          b: "Lasagna",
          c: "Pizza",
         
        },
        correctAnswer: "c"
      },
       {
        question: "What was Marilyn Monroe's natural hair colour?",
        answers: {
          a: "Ginger",
          b: "Blue",
          c: "Brown",
         
        },
        correctAnswer: "a"
      },
       {
        question: "Which two metals is pewter made from?",
        answers: {
          a: "Copper and Bronze",
          b: "Tin and lead.",
          c: "Zinc and gold",
         
        },
        correctAnswer: "b"
      },
       {
        question: "What takes place in Hong Kong's Happy Valley?",
        answers: {
          a: "Monkey racing",
          b: "Dog racing.",
          c: "Horse racing",
         
        },
        correctAnswer: "c"
      },
       {
        question: "Which country does the sport of pelato come from?",
        answers: {
          a: "Portugal",
          b: "Spain",
          c: "Italy",
         
        },
        correctAnswer: "b"
      },
       {
        question: "How many sides, in total, would three triangles and three rectangles have?",
        answers: {
          a: "21",
          b: "19",
          c: "12",
         
        },
        correctAnswer: "a"
      },
       {
        question: "Who invented the bikini?",
        answers: {
          a: "Gianni Versace",
          b: "Louis Reard.",
          c: "Dolce Gabbana",
         
        },
        correctAnswer: "b"
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
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  
  


















         



// const cat_btn = document.getElementById('cat_btn');
// const dog_btn = document.getElementById('dog_btn');
// const cat_result = document.getElementById('cat_result');
// const dog_result = document.getElementById('dog_result');

// cat_btn.addEventListener('click', getRandomCat);
// dog_btn.addEventListener('click', getRandomDog);

// function getRandomCat() {
// 	fetch('https://aws.random.cat/meow')
// 		.then(res => res.json())
// 		.then(data => {
// 			cat_result.innerHTML = `<img src=${data.file} alt="cat" />`
// 		});
// }

// function getRandomDog() {
// 	fetch('https://random.dog/woof.json')
// 		.then(res => res.json())
// 		.then(data => {
// 			if(data.url.includes('.mp4')) {
// 				getRandomDog();
// 			}
// 			else {
// 				dog_result.innerHTML = `<img src=${data.url} alt="dog" />`;
// 			}
// 		});
// }













// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Maak woordenschatvragen per alinea over het volgende onderwerp voor leerlingen van het 4e leerjaar met synonieme antwoorden als meerkeuzevragen met het juiste antwoord:\n\nNa het doorzoeken van honderden sollicitaties heeft Geronimo eindelijk de perfecte assistent gevonden. Pinky Punk is jong, hip en een kei met computers. Maar Geronimo let niet op en heeft het contract al getekend als hij erachter komt dat ze niet alleen veel te jong is, maar ook nog eens heel brutaal. Ze organiseert een nieuwjaarsfeest op de Noordpool, waar ze de hele Stilton-familie naartoe sleept. Geronimo houdt niet van Pinky's wilde levensstijl, luide muziek en nieuwe snufjes. Maar Pinky zit ook vol goede ideeën en krijgt sensationele dingen voor elkaar. Het leven van Geronimo zal nooit meer hetzelfde zijn.\n\n1. Wat is Pinky's leeftijd? \nA. Jong \nB. Oud \nC. Middelbaar \nD. Volwassen \nAntwoord: A. Jong\n\n2. Wat voor soort persoon is Pinky?\nA. Rustig \nB. Luidruchtig \nC. Creatief \nD. Gemiddeld \nAntwoord: C. Creatief\n\n3. Wat organiseert Pinky?\nA. Een kerstfeest \nB. Een nieuwjaarsfeest \nC. Een verjaardagsfeest \nD. Een bruiloftsfeest \nAntwoord: B. Een nieuwjaarsfeest\n\n4. Waar organiseert Pinky haar nieuwjaarsfeest? \nA. Op het strand \nB. In de bergen \nC. In de woestijn \nD. Op de Noordpool \nAntwoord: D. Op de Noordpool\n\n5. Wat vindt Geronimo niet",
//   temperature: 0.7,
//   max_tokens: 256,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });








