/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Vals
let min = 1, 
    max=10,
    winningNum = getRandNum(min,max),
    guessesAvail = 3;

//UI elements
const UIgame = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UIguessInput = document.querySelector('#guess-input'),
    UImessage = document.querySelector('.message');
//Assign UI min and max
UIminNum.textContent=min;
UImaxNum.textContent=max;


//add click listener to UIguessBtn and call checkGuess when heard
UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value);
    if(guessesAvail==0){
        //disable more guesses
        
        UIguessInput.style.borderColor= 'red';
        setMessage(`You have ${guessesAvail} left. The correct number was ${winningNum}!`);

    }
    checkGuess(guess)
});
//add click listener for new play again btn
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again')
    window.location.reload();
})


//function to check guess input
function checkGuess(guess){

    
    //if not a number or outside of range...
    if(isNaN(guess)|| guess<min || guess>max){
        //call set message
        setMessage(`Please enter a number between ${min} and ${max}.`,'red');
    }else if(guess==winningNum){
        //call endGame
        endGame(true,`${guess} is Correct!`,'green');

    }else{
        
        guessesAvail -=1;
        UIguessInput.value='';
        
        if(guessesAvail===0){
            //disable more guesses
            
            endGame(false,`You have ${guessesAvail} left. The correct number was ${winningNum}!`)
            return;
        }
        //change border to red to indicate incorrect guess
        UIguessInput.style.borderColor= 'red';
        
        setMessage(`${guess} is Incorrect. You have ${guessesAvail} left!`,'red');

    }

}

function endGame(winner,msg){
    let color;
    
    UIguessInput.placeholder ='Game Over';
    winner === true ? color = 'green' : color = 'red';
    setMessage(msg,color);

    //play again
    UIguessBtn.value='Play Again';
    UIguessBtn.className += 'play-again';



}

function setMessage(msg,color){
    UImessage.style.color= color;
    UImessage.textContent = msg;
}

function getRandNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}