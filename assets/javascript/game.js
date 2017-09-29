//--- --- Global Variable Definitions --- ---

var questionsTotal = 0;
var questionsRight = 0;

// highscore not implemented
//var playerScore = 0;
//var highScore = 0;

var timerInterval = 0;

// Adjust to set length of game
var maxQuestions = 5;

var questions = [
{"questionText":"What foodstuff does Scott learn will make him fat?",
"answer1":"Bread",
"answer2":"Bacon",
"answer3":"Beer",
"answer4":"Bananas"},

{"questionText":"What city does Scott live in?",
"answer1":"Toronto",
"answer2":"Calgary",
"answer3":"Montreal",
"answer4":"Saskatoon"},

{"questionText":"What dimension does Ramona use to travel?",
"answer1":"Subspace",
"answer2":"Altworld",
"answer3":"Level 0-0",
"answer4":"Darklands"},

{"questionText":"How many of Ramona's evil exes does Scott have to defeat?",
"answer1":"Seven",
"answer2":"Nine",
"answer3":"Five",
"answer4":"Eight"},

{"questionText":"Who is Ramona's most recent ex?",
"answer1":"Gideon Graves",
"answer2":"Roxy Richter",
"answer3":"Lucas Lee",
"answer4":"Matthew Patel"},

{"questionText":"What restaurant does Scott finally get a job at?",
"answer1":"The Happy Avocado",
"answer2":"The Jaunty Jalapeno",
"answer3":"The Tasty Greens",
"answer4":"The Smug Vegan"},

{"questionText":"What brand of bass guitar does Scott play?",
"answer1":"Rickenbacker",
"answer2":"Ibanez",
"answer3":"Danelectro",
"answer4":"Fender"},

{"questionText":"What band does Scott's ex Envy sing in?",
"answer1":"Clash at Demonhead",
"answer2":"Throat of the World",
"answer3":"Doom Mountain",
"answer4":"Spectacle Rock"},

{"questionText":"What was the name of Scott's first band?",
"answer1":"Sonic & Knuckles",
"answer2":"Crash and the Boys",
"answer3":"Kid Chamelon",
"answer4":"The Alex Kidds"},

{"questionText":"What is the name of Gideon's club?",
"answer1":"Chaos Theatre",
"answer2":"Disruption",
"answer3":"The Wilderness",
"answer4":"Club Control"},

{"questionText":"How many collected Scott Pilgrim books have been published?",
"answer1":"Six",
"answer2":"Five",
"answer3":"Seven",
"answer4":"Three"},

{"questionText":"Who is Scott's evil alternate version?",
"answer1":"Negascott",
"answer2":"Alt-Scott",
"answer3":"Dark Scott",
"answer4":"Scott-1"}

];

//create array to store used question indices
var askedQuestions = [];

var gameMode = 'startGame';

//--- --- Global Function / Object Definitions --- ---

//evaluates game mode and displays appropriate elements
function refreshScreen(){

  switch(gameMode){

    case "startGame": 

      // clear panel
      $('#main-panel').html('');
      $('#timer').text('');

      // create/append title
      $('#main-panel').append('<img class="inline-image sprite-image" src="https://media.giphy.com/media/14gztnGq8HtZUQ/giphy.gif">')

      var title = $('<h1>');
      title.text('Scott Pilgrim Trivia');
      $('#main-panel').append(title);

      $('#main-panel').append('<img class="inline-image sprite-image" src="https://media.giphy.com/media/1L3JJulZNiquQ/giphy.gif">')

      $('#main-panel').append('<br>');

      // create/append startbutton
      var startButton = $('<button>');
      startButton.text('Press Start!');
      startButton.addClass('start-button btn btn-default');
      $('#main-panel').append(startButton);
      
      break;    

// Begin Question Panel
case "triviaQuestion":

questionsTotal ++;

      // clear panel
      $('#main-panel').html('');

      // initialize question round timer
      var currentTimer = 7;
      $('#timer').text(currentTimer);
      timerInterval = setInterval(function(){

        //decrement by 1
        currentTimer --;

        //write time to #timer
        $('#timer').text(currentTimer);

        //when timer reaches 0, clear interval and move to Results
        if(currentTimer===0){

          clearInterval(timerInterval);
          $('#timer').text("Time's Up!");

          gameMode = "triviaResult";
          refreshScreen();

        }
      }, 1000);

      //randomly select a question from the array of questions

      var currentIndex = Math.floor(Math.random()*questions.length)

      //if question previously used, generate again
      while( askedQuestions.indexOf(currentIndex) != -1 ){
        currentIndex = Math.floor(Math.random()*questions.length)
      }

      askedQuestions.push(currentIndex);

      var currentQuestion = questions[currentIndex];

      // display question in main-panel

      var currentQuestionDiv = $('<div>');
      var currentQuestionText = $('<h2>');

      currentQuestionText.addClass('jumbotron');

      currentQuestionText.text(currentQuestion.questionText);

      currentQuestionDiv.append(currentQuestionText)
      $('#main-panel').append(currentQuestionDiv);

      // display answer buttons in random order

      var answerList = [1,2,3,4]

      for( var i = 0; i < 4; i++){

        var currentAnswerIndex = Math.floor(Math.random()*answerList.length);
        var currentButton = $('<button>')
        //SUPER PROUD OF THIS LINE
        currentButton.text(eval('currentQuestion.answer'+(answerList[currentAnswerIndex])));
        currentButton.addClass('answer-button btn btn-default');

        // adds data to button to indicate correct value
        if( answerList[currentAnswerIndex] === 1)
        {
          currentButton.attr('data-value','correct');
          currentButton.addClass('correct-answer');
        }

        else{
          currentButton.attr('data-value','incorrect');
          currentButton.addClass('incorrect-answer');
        }

        answerList.splice(currentAnswerIndex, 1);
        

        $('#main-panel').append(currentButton);
        // $('#main-panel').append('<br>');
      }
      
      break;

// begin Result panel
case "triviaResult":

      // initialize result screen timer (not displayed)
      var currentTimer = 3;
      
      timerInterval = setInterval(function(){

        //decrement by 1
        currentTimer --;

        //when timer reaches 0, clear interval and move to Results
        if(currentTimer===0){

          clearInterval(timerInterval);

          //when finished, move to next question
          //unless max questions reached, then move to endGame
          if( questionsTotal === maxQuestions ){ 
            gameMode = "endGame";
            refreshScreen();
          }
          else{
            gameMode = "triviaQuestion";
            refreshScreen();  
          }
        }
      }, 1000);

      //hide unguessed answers
      $('.incorrect-answer').css('visibility', 'hidden');

      //highlight correct answer in green
      $('.correct-answer').addClass('btn-success');
      
      break;    

// Begin EndGame Panel    
case "endGame":

console.log( questionsRight +' out of ' +questionsTotal );

        //clear panel
        $('#main-panel').html('');
        $('#timer').text('');

        //if score > highscore, highscore=score *** Not Implemented

        //show image, happy if correct >= 3, else sad
        if(questionsRight >= 3){
          $('#main-panel').append('<img class="end-image" src="https://media.giphy.com/media/I4F1CxDZgikeY/giphy.gif">')
        }
        else{
          $('#main-panel').append('<img class="end-image" src="https://media.giphy.com/media/of63gWdEHNdTi/giphy.gif">')
        }

        //show results info
        var resultText = $('<div>');
        resultText.html('<h2>You got ' +questionsRight +' out of ' +questionsTotal +'!</h2>');
        resultText.addClass('jumbotron');
        $('#main-panel').append(resultText);

        // show restart button
        var startButton = $('<button>');
        startButton.text('Restart Game!');
        startButton.addClass('start-button btn btn-default');
        $('#main-panel').append(startButton);

      }
    }

//--- --- Main Logic --- ---

//when page loads, draw the screen
$( document ).ready(refreshScreen());

//--- ---- CLICK HANDLERS --- ---

// when start button clicked
$(document).on("click", ".start-button", function(){

  //initialize variables

  questionsTotal = 0;
  questionsRight = 0;
  playerScore = 0;

  gameMode = "triviaQuestion";

  refreshScreen();

});

//when answer button clicked
$(document).on("click", ".answer-button", function(){
  //prevent multiple button clicks per question
  if( gameMode === "triviaQuestion"){
    clearInterval(timerInterval);

    console.log($(this).attr('data-value'));
    
    $(this).removeClass('incorrect-answer');

    // if answer correct, increment correct answers, if guessed wrong highlight in red

    if( $(this).attr('data-value') === 'correct'){
      questionsRight ++;
    }
    else{
      $(this).addClass('btn-danger');
    }
    gameMode = "triviaResult";

    refreshScreen();
  }

});