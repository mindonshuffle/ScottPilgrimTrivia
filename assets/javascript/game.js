//--- --- Global Variable Definitions --- ---

var questionsTotal = 0;
var questionsRight = 0;
var playerScore = 0;
var highScore = 0;

var maxQuestions = 2;

var questions = [{"questionText":"This is a question?",
"rightAnswer":"This is the right answer",
"wrongAnswer1":"This is 1 wrong answer",
"wrongAnswer2":"This is 2 wrong answer",
"wrongAnswer3":"This is 3 wrong answer"},
{"questionText":"This is second question?",
"rightAnswer":"This is the right answer",
"wrongAnswer1":"This is 1 wrong answer",
"wrongAnswer2":"This is 2 wrong answer",
"wrongAnswer3":"This is 3 wrong answer"},]

var gameMode = 'startGame';

//--- --- Global Function / Object Definitions --- ---

//constructor array for Questions
// function Question(questionText, answerCorrect, answerWrong1, answerWrong2, answerWrong3) {
//   this.questionText = questionText;
//   this.answer1 = answer1;
//   this.answer2 = answer2;
//   this.answer3 = answer3;
//   this.answer4 = answer4;
// }

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

    case "triviaQuestion":

      questionsTotal ++;
      console.log(questionsTotal);

      // clear panel
      $('#main-panel').html('Question Test');

      // initialize question round timer
      var currentTimer = 7;
      $('#timer').text(currentTimer);
      var timerInterval = setInterval(function(){

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

      // display question
      // display answer buttons

    break;


    case "triviaResult":

      $('#main-panel').html('results display');
        
  // initialize question round timer
      var currentTimer = 3;
      $('#timer').text(currentTimer);
      var timerInterval = setInterval(function(){

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

      



      case "endGame":

        console.log("End of Game");

        //clear panel
        //if score > highscore, highscore=score
        //show results info
        // show restart button

          var startButton = $('<button>');
          startButton.text('Start Game!');
          startButton.addClass('start-button');
          $('#main-panel').append(startButton);

        
        //break;

    }
  }

//--- --- Main Logic --- ---

refreshScreen();



//--- ---- CLICK HANDLERS --- ---

//$('.start-button').on("click", function(){

$(document).on("click", ".start-button", function(){

//initialize variables

questionsTotal = 0;
questionsRight = 0;
playerScore = 0;

console.log('start');

gameMode = "triviaQuestion";

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