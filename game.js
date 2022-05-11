const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameOn = false;
let level = 0;

const year = new Date().getFullYear();

$(document).ready(function () {
    $(".footer").text("copyrightⒸ" + ' ' + year + ' ' + "Yaniv Weinshtein");
});

$(document).bind("keypress click", function () {
    if (!gameOn) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameOn = true;
    }
    // start the game when pressing on the keyboard
});


$(".btn").on("click", function () {
    var indexOfLastAnswer = -1;
    var userChosenColor = $(this).attr("id"); // the id of the button being clicked by user
    userClickedPattern.push(userChosenColor);
    indexOfLastAnswer++;
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    // send the *index* of the last color (-1)
    // red = 0, blue = 1, green = 2, yellow = 3
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    sleep(1000);
    level = 0;
    gamePattern = [];
    gameOn = false;
}
