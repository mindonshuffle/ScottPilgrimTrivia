//--- --- Global Variable Definitions --- ---

var questionsTotal = 0;
var questionsRight = 0;
var playerScore = 0;
var highScore = 0;
var timerInterval = 0;

// Adjust to set length of game
var maxQuestions = 2;

var questions = [{"questionText":"This is a question?",
"answer1":"This is the right answer",
"answer2":"This is 2 wrong answer",
"answer3":"This is 3 wrong answer",
"answer4":"This is 4 wrong answer"},
{"questionText":"This is second question?",
"answer1":"This is the right answer",
"answer2":"This is 2 wrong answer",
"answer3":"This is 3 wrong answer",
"answer4":"This is 4 wrong answer"},
{"questionText":"This is a third question?",
"answer1":"This is the right answer",
"answer2":"This is 2 wrong answer",
"answer3":"This is 3 wrong answer",
"answer4":"This is 4 wrong answer"}];

var gameMode = 'startGame';

//--- --- Global Function / Object Definitions --- ---

//evaluates game mode and displays appropriate elements
function refreshScreen(){

  switch(gameMode){
    
    case "startGame": 
      console.log('game start')

      // clear panel
      $('#main-panel').html('');

      // create/append title
      var title = $('<h1>');
      title.text('Trivia Game!!');
      $('#main-panel').append(title);

      // create/append startbutton
      var startButton = $('<button>');
      startButton.text('Start Game!');
      startButton.addClass('start-button');
      $('#main-panel').append(startButton);
      
      break;    

// Begin Question Panel
    case "triviaQuestion":

      questionsTotal ++;
      console.log(questionsTotal);

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
          console.log("End of Question");
          clearInterval(timerInterval);

          gameMode = "triviaResult";
          refreshScreen();

        }
      }, 1000);

      //randomly select a question from the array of questions

      var currentQuestion = questions[Math.floor(Math.random()*questions.length)];
      console.log(currentQuestion.questionText);

      // display question in main-panel

      var currentQuestionText = $('<h2>');
      currentQuestionText.text(currentQuestion.questionText);

      $('#main-panel').append(currentQuestionText);

      // display answer buttons in random order

      for( var i = 0; i < 4; i++){
        console.log(hi);

        var answerList = [1,2,3,4]
        for( var j = 0; j < answerList.length; j++){
          var currentAnswer = Math.floor(Math.random()*answerList.length);

          var currentButton = $('<button>')
        //SUPER PROUD OF THIS LINE
          currentButton.text(eval('currentQuestion.answer'+(i+1)));
          currentButton.addClass('answer-button');

          // adds data to button to indicate correct value
          if( answerList[currentAnswer] === 0)
          {
            currentButton.attr('data-value','correct');
          }

          else{
            currentButton.attr('data-value','incorrect');
          }

          $('#main-panel').append(currentButton);
        }
      }

      break;

// begin Result panel
    case "triviaResult":

      $('#main-panel').html('');

  // initialize result screen timer

      var currentTimer = 3;
      $('#timer').text(currentTimer);
      timerInterval = setInterval(function(){

        //decrement by 1
        currentTimer --;

        //write time to #timer
        $('#timer').text(currentTimer);

        //when timer reaches 0, clear interval and move to Results
        if(currentTimer===0){
          console.log("End of Result");
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
      //if wrong answer guessed, highlight in red
      //highlight correct answer in green 
      
      break;    

// Begin EndGame Panel    
    case "endGame":

      console.log( questionsRight +' out of ' +questionsTotal );

        //clear panel
        $('#main-panel').html('');

        //if score > highscore, highscore=score

        //show results info

        var resultText = $('<h1>');
        resultText.text('You got ' +questionsRight +' out of ' +questionsTotal );
        $('#main-panel').append(resultText);

        // show restart button
        var startButton = $('<button>');
        startButton.text('Start Game!');
        startButton.addClass('start-button');
        $('#main-panel').append(startButton);

      }
    }

//--- --- Main Logic --- ---

refreshScreen();

//--- ---- CLICK HANDLERS --- ---


// when start button clicked
$(document).on("click", ".start-button", function(){

  //initialize variables

  questionsTotal = 0;
  questionsRight = 0;
  playerScore = 0;

  console.log('start');

  gameMode = "triviaQuestion";

  refreshScreen();

});

//when answer button clicked
$(document).on("click", ".answer-button", function(){

  clearInterval(timerInterval);

  console.log('answer');

  console.log($(this).attr('data-value'));

  // if answer correct, increment correct answers

  if( $(this).attr('data-value') === 'correct'){
    questionsRight ++;
  }

  gameMode = "triviaResult";

  refreshScreen();

});


/*--- --- PSEUDO CODE --- ---


Timer:

set to 20 seconds

setrecurringinterval 1 sec to (
  decrement time
  refresh displayed time
  if timeRemaining==0(
    //display out of time//
    set gameMode to results  
  )
)


*/

/*--- --- NOTES TO SELF --- ---

*Ensure "on loaded" function around main code


*/