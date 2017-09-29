//--- --- Global Variable Definitions --- ---

var questionsTotal = 0;
var questionsRight = 0;
//var playerScore = 0;
//var highScore = 0;
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
      
      // clear panel
      $('#main-panel').html('');
      $('#timer').text('');

      // create/append title
      $('#main-panel').append('<img class="inline-image" src="https://media.giphy.com/media/14gztnGq8HtZUQ/giphy.gif">')

      var title = $('<h1>');
      title.text('Scott Pilgrim Trivia');
      $('#main-panel').append(title);

      $('#main-panel').append('<img class="inline-image" src="https://media.giphy.com/media/1L3JJulZNiquQ/giphy.gif">')

      $('#main-panel').append('<br>');

      // create/append startbutton
      var startButton = $('<button>');
      startButton.text('Start Game!');
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

      var currentQuestion = questions[Math.floor(Math.random()*questions.length)];

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
        $('#main-panel').append('<br>');
      }
      
      break;

// begin Result panel
    case "triviaResult":

      // $('#main-panel').html('');

  // initialize result screen timer

      var currentTimer = 3;
      // $('#timer').text(currentTimer);
      
      timerInterval = setInterval(function(){

        //decrement by 1
        currentTimer --;

        //write time to #timer
        //$('#timer').text(currentTimer);

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

        //if score > highscore, highscore=score

        //show results info

        var resultText = $('<h1>');
        resultText.text('You got ' +questionsRight +' out of ' +questionsTotal );
        $('#main-panel').append(resultText);

        // show restart button
        var startButton = $('<button>');
        startButton.text('Start Game!');
        startButton.addClass('start-button btn btn-default');
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


/*--- --- PSEUDO CODE --- ---


*/

/*--- --- NOTES TO SELF --- ---

*Ensure "on loaded" function around main code


*/