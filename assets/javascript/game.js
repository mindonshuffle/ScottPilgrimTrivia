//--- --- Global Variable Definitions --- ---

var questionsTotal = 0;
var questionsRight = 0;
var playerScore = 0;
var highScore = 0;

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

// var a = $("<button>");
// a.addClass("movie");
// a.attr("data-name", movies[i]);
// a.text(movies[i]);
// $("#movies-view").append(a);

      // add title
      var title = $('<h1>');
      title.text('Trivia Game!!');
      $('#main-panel').append(title);

      // add startbutton
      var startButton = $('<button>');
      
      startButton.text('Start Game!');
      startButton.attr('id', 'start-button')
      $('#main-panel').append(startButton);
      
      break;    

    case "triviaQuestion":
      
      // clear panel
      // initialize question round timer
        // move to triviaResult when finished
      // display question
      // display answer buttons

      break;

    case "triviaResult":

      //initialize results timer
        //when finished, move to next question
          //unless max questions reached, then move to endGame

      //hide unguessed answers
      //if wrong answer guessed, highlight in red
      //highlight correct answer in green 
      
      break;    

    case "endGame":

      //clear panel
      //if score > highscore, highscore=score
      //show results info
      // show restart button
      
      break;

  }
}

//--- --- Main Logic --- ---

refreshScreen();



$('#start-button').on("click", function(){

  console.log('start');

});



/*--- --- PSEUDO CODE --- ---



*/

/*--- --- NOTES TO SELF --- ---

*Ensure "on loaded" function around main code


*/