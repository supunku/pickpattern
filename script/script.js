//User selection 

var userSelectedPattern = [];

//Game selection 

var gamePattern =[];


//Initial game status

var gameStatus = false;

//Initial game level

var gameLevel = 0;



//Listen to keypress event

$(document).keypress(function(){
    if(!gameStatus)
    gameStatus = true;
    nextPattern();
})


//Play the sound

function playSound(color){

    var audio = new Audio ("sounds/" + color + ".mp3")
    audio.play();

}

//Animate the button

function animateButtonPress(color){
    var button = $("."+ color);
    button.addClass("press");

    setTimeout(function(){
        button.removeClass("press")
    },100)
}

//create next game pattern

function nextPattern(){

    userSelectedPattern=[]; 

    var randomColor = getRandomColor();
    gamePattern.push(randomColor);

    // play the sound
    playSound(randomColor);

    // add style
    animateButtonPress(randomColor);

    gameLevel++;
    $("p").text("Level "+ gameLevel);

}








//Listen to the click event in the button

$(".btn").click(function(){
    //get the button
    var selectedButton = $(this);
    //selecting the button by color id
    var selectedColor = selectedButton.attr("id");
    //Store it in userSelection array
    userSelectedPattern.push(selectedColor);

    //play sound for the selected color
    playSound(selectedColor);

    //animate for the selected button

    animateButtonPress(selectedColor);
    
    //get the index of the last click element of the array

    var lastIndex = userSelectedPattern.length - 1;


    if (gamePattern[lastIndex] === userSelectedPattern[lastIndex]){
        if (userSelectedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextPattern();
            },1000)
        }
    }else{
        $("p").text("Game Over,Press Any Key To Restart ");
        playSound("wrong");
        gameLevel = 0;
        gameStatus = false;
        gamePattern =[];
        $("body").addClass("gameOver")
        setTimeout(function(){
            $("body ").removeClass("gameOver")
        },300)
    }
    
})


//colors 

var colors = ["red","blue","green","yellow"];

// selecting a random color



function getRandomColor(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colors[randomNumber];

    return randomColor;

}



